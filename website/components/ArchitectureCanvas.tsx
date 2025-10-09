"use client";

import { useRef, useState, useEffect } from "react";
import ComponentMenu from "./ComponentMenu";
import ApiDefinitionMenu from "./ApiDefinitionMenu";
import ModulesMenu from "./ModulesMenu";
import ComponentNode from "./canvas/ComponentNode";
import ResizeHandles from "./canvas/ResizeHandles";
import ConnectionRenderer from "./canvas/ConnectionRenderer";
import ComponentCreationPreview from "./canvas/ComponentCreationPreview";
import EmptyState from "./canvas/EmptyState";
import ModuleIndicators from "./canvas/ModuleIndicators";
import { useCanvasInteraction } from "./canvas/useCanvasInteraction";
import { findNearestEdge } from "./canvas/utils";
import type { Component, Connection, Tool } from "./canvas/types";
import { GRID_SIZE } from "./canvas/types";

// Re-export types for convenience
export type { Component, Connection, Tool };

interface ArchitectureCanvasProps {
  tool: Tool;
  components: Component[];
  connections: Connection[];
  selectedComponent: string | null;
  connectionStart: string | null;
  onCanvasClick: (x: number, y: number) => void;
  onComponentClick: (componentId: string) => void;
  onComponentUpdate: (componentId: string, updates: Partial<Component>) => void;
  onComponentDelete: (componentId: string) => void;
  onConnectionCreate: (
    from: string,
    to: string,
    fromSide: string,
    toSide: string
  ) => void;
  onConnectionDelete: (connectionId: string) => void;
  onConnectionUpdate: (
    connectionId: string,
    updates: Partial<Connection>
  ) => void;
  onSelectedComponentChange: (componentId: string | null) => void;
}

export default function ArchitectureCanvas({
  tool,
  components,
  connections,
  selectedComponent,
  onCanvasClick,
  onComponentUpdate,
  onComponentDelete,
  onConnectionCreate,
  onConnectionDelete,
  onConnectionUpdate,
  onSelectedComponentChange,
}: ArchitectureCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const {
    resizing,
    setResizing,
    dragging,
    setDragging,
    creatingComponent,
    setCreatingComponent,
    dragConnection,
    setDragConnection,
    dragIntent,
    setDragIntent,
    dragTimerRef,
  } = useCanvasInteraction({
    tool,
    components,
    onComponentUpdate,
    canvasRef,
    zoom,
    pan,
  });

  const [hoveredEdge, setHoveredEdge] = useState<{
    componentId: string;
    side: "top" | "right" | "bottom" | "left";
  } | null>(null);

  const [renamePopup, setRenamePopup] = useState<{
    componentId: string;
    x: number;
    y: number;
  } | null>(null);

  const [connectionMenu, setConnectionMenu] = useState<{
    connectionId: string;
    x: number;
    y: number;
  } | null>(null);

  const [apiDefinitionMenu, setApiDefinitionMenu] = useState<{
    componentId: string;
    x: number;
    y: number;
  } | null>(null);

  const [modulesMenu, setModulesMenu] = useState<{
    componentId: string;
    x: number;
    y: number;
  } | null>(null);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;

    // Left-click to pan when in select mode and not creating a component
    if (e.button === 0 && tool === "select") {
      e.preventDefault();
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }

    // Create component mode
    if (tool === "component") {
      const rect = canvasRef.current.getBoundingClientRect();
      const viewportX = e.clientX - rect.left;
      const viewportY = e.clientY - rect.top;

      // Convert to canvas coordinates (accounting for pan and zoom)
      const canvasX = (viewportX - pan.x) / zoom;
      const canvasY = (viewportY - pan.y) / zoom;

      setCreatingComponent({
        startX: canvasX,
        startY: canvasY,
        currentX: canvasX,
        currentY: canvasY,
      });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current || resizing) return;

    const hadMenuOpen = renamePopup !== null || connectionMenu !== null;

    if (renamePopup) setRenamePopup(null);
    if (connectionMenu) setConnectionMenu(null);

    if (dragConnection) {
      setDragConnection(null);
      setHoveredEdge(null);
      return;
    }

    onSelectedComponentChange(null);

    if (hadMenuOpen) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
    const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;

    onCanvasClick(snappedX, snappedY);
  };

  const handleComponentClick = (e: React.MouseEvent, componentId: string) => {
    e.stopPropagation();
  };

  const handleEdgeClick = (
    e: React.MouseEvent,
    componentId: string,
    side: "top" | "right" | "bottom" | "left"
  ) => {
    e.stopPropagation();
    if (tool !== "connection") return;

    if (dragConnection && dragConnection.from !== componentId) {
      const fromComp = components.find((c) => c.id === dragConnection.from);
      const toComp = components.find((c) => c.id === componentId);

      if (fromComp && toComp) {
        const nearestEdge = findNearestEdge(
          fromComp,
          toComp,
          dragConnection.fromSide
        );
        onConnectionCreate(
          dragConnection.from,
          componentId,
          dragConnection.fromSide,
          nearestEdge
        );
      }

      setDragConnection(null);
      setHoveredEdge(null);
      return;
    }

    if (!dragConnection && canvasRef.current) {
      const component = components.find((c) => c.id === componentId);
      if (!component) return;

      setDragConnection({
        from: componentId,
        fromSide: side,
        mouseX: component.x + component.width / 2,
        mouseY: component.y + component.height / 2,
      });
    }
  };

  const handleComponentMouseDown = (
    e: React.MouseEvent,
    componentId: string
  ) => {
    e.stopPropagation();

    if (tool === "connection") {
      const component = components.find((c) => c.id === componentId);
      if (!component) return;

      setDragConnection({
        from: componentId,
        fromSide: "right",
        mouseX: component.x + component.width / 2,
        mouseY: component.y + component.height / 2,
      });
    }
  };

  const handleComponentMouseUp = (e: React.MouseEvent, componentId: string) => {
    e.stopPropagation();

    const wasDragging = dragging !== null;
    const wasResizing = resizing !== null;

    setDragging(null);

    if (
      tool === "connection" &&
      dragConnection &&
      dragConnection.from !== componentId
    ) {
      const fromComp = components.find((c) => c.id === dragConnection.from);
      const toComp = components.find((c) => c.id === componentId);

      if (fromComp && toComp) {
        // Prevent connections between two client components (web or mobile)
        const isFromClient =
          fromComp.type === "web" || fromComp.type === "mobile";
        const isToClient = toComp.type === "web" || toComp.type === "mobile";
        if (isFromClient && isToClient) {
          setDragConnection(null);
          return;
        }

        const nearestEdge = findNearestEdge(fromComp, toComp, "right");
        onConnectionCreate(
          dragConnection.from,
          componentId,
          "right",
          nearestEdge
        );
      }

      setDragConnection(null);
      return;
    }

    if (tool === "connection" && dragConnection) {
      setDragConnection(null);
      return;
    }

    if (tool === "select" && !wasDragging && !wasResizing) {
      // Close any open menus first
      setApiDefinitionMenu(null);
      setModulesMenu(null);

      onSelectedComponentChange(componentId);
      setRenamePopup({
        componentId,
        x: 0, // Will be positioned top-right via CSS
        y: 0,
      });
    }
  };

  const handleDragIconMouseDown = (
    e: React.MouseEvent,
    componentId: string
  ) => {
    e.stopPropagation();

    if (tool !== "select" || resizing) return;

    const component = components.find((c) => c.id === componentId);
    if (!component || !canvasRef.current) return;

    // Store absolute viewport coordinates for drag intent
    setDragIntent({
      componentId,
      startTime: Date.now(),
      startX: e.clientX,
      startY: e.clientY,
      enabled: true,
    });
  };

  const handleDragIconMouseUp = (e: React.MouseEvent, componentId: string) => {
    e.stopPropagation();

    const wasDragging = dragging !== null;

    if (!wasDragging && dragIntent) {
      // If not dragging, show menu
      onSelectedComponentChange(componentId);
      setRenamePopup({
        componentId,
        x: 0, // Will be positioned top-right via CSS
        y: 0,
      });
    }

    setDragging(null);
    setDragIntent(null);
  };

  const handleResizeStart = (
    e: React.MouseEvent,
    componentId: string,
    corner: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  ) => {
    e.stopPropagation();
    const component = components.find((c) => c.id === componentId);
    if (!component) return;

    setResizing({
      id: componentId,
      corner,
      startX: e.clientX,
      startY: e.clientY,
      startComponentX: component.x,
      startComponentY: component.y,
      startWidth: component.width,
      startHeight: component.height,
    });
  };

  const handleConnectionClick = (
    e: React.MouseEvent,
    connectionId: string,
    midX: number,
    midY: number
  ) => {
    e.stopPropagation();
    const canvasHeight = 600;
    const menuHeight = 200;
    const centeredY = (canvasHeight - menuHeight) / 2;
    setConnectionMenu({ connectionId, x: midX, y: centeredY });
  };

  const handleDefineApi = (componentId: string) => {
    setApiDefinitionMenu({
      componentId,
      x: 0, // Will be positioned via CSS at top-right
      y: 0,
    });
  };

  const handleAddModules = (componentId: string) => {
    setModulesMenu({
      componentId,
      x: 0, // Will be positioned via CSS at top-right
      y: 0,
    });
  };

  const handleConnectionUpdateInternal = (
    connectionId: string,
    updates: { useSDK: boolean }
  ) => {
    // Update connection in parent component
    onConnectionUpdate(connectionId, updates);
  };

  // Zoom and Pan handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    // Check if this is a pinch gesture (ctrlKey is set for trackpad pinch)
    if (e.ctrlKey) {
      // Pinch to zoom
      const delta = -e.deltaY * 0.01;
      const newZoom = Math.min(Math.max(0.1, zoom + delta), 3);
      setZoom(newZoom);
    } else {
      // Pan with trackpad
      setPan({
        x: pan.x - e.deltaX,
        y: pan.y - e.deltaY,
      });
    }
  };

  const handlePanMove = (e: MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handlePanEnd = () => {
    setIsPanning(false);
  };

  // Set up pan event listeners
  useEffect(() => {
    if (isPanning) {
      window.addEventListener("mousemove", handlePanMove);
      window.addEventListener("mouseup", handlePanEnd);
      return () => {
        window.removeEventListener("mousemove", handlePanMove);
        window.removeEventListener("mouseup", handlePanEnd);
      };
    }
  }, [isPanning, panStart]);

  return (
    <div
      ref={canvasRef}
      onClick={handleCanvasClick}
      onMouseDown={handleCanvasMouseDown}
      onWheel={handleWheel}
      onContextMenu={(e) => e.preventDefault()}
      className="relative w-full h-full bg-zinc-900 overflow-hidden animate-fade-in"
      style={{
        overscrollBehavior: "none",
        touchAction: "none",
        backgroundImage:
          "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        backgroundSize: `${GRID_SIZE * zoom}px ${GRID_SIZE * zoom}px`,
        backgroundPosition: `${pan.x}px ${pan.y}px`,
        cursor: isPanning
          ? "grabbing"
          : tool === "component" || dragConnection
          ? "crosshair"
          : tool === "select"
          ? "grab"
          : "default",
        userSelect: tool === "connection" ? "none" : "auto",
      }}
    >
      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 text-xs text-zinc-400 z-50 pointer-events-none animate-fade-in delay-300">
        {Math.round(zoom * 100)}%
      </div>

      {/* Transform wrapper for zoom and pan */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
          width: "5000px",
          height: "5000px",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {/* Render Connections */}
        <ConnectionRenderer
          connections={connections}
          components={components}
          dragConnection={dragConnection}
          onConnectionClick={handleConnectionClick}
        />

        {/* Preview component being created */}
        {creatingComponent && (
          <ComponentCreationPreview
            startX={creatingComponent.startX}
            startY={creatingComponent.startY}
            currentX={creatingComponent.currentX}
            currentY={creatingComponent.currentY}
          />
        )}

        {/* Render Components */}
        {components.map((component) => (
          <div key={component.id} style={{ position: "relative" }}>
            <ComponentNode
              component={component}
              tool={tool}
              isSelected={selectedComponent === component.id}
              isDragging={
                dragging?.id === component.id ||
                dragIntent?.componentId === component.id
              }
              isConnectionSource={dragConnection?.from === component.id}
              onMouseDown={(e) => handleComponentMouseDown(e, component.id)}
              onMouseUp={(e) => handleComponentMouseUp(e, component.id)}
              onClick={(e) => handleComponentClick(e, component.id)}
              onDragIconMouseDown={(e) =>
                handleDragIconMouseDown(e, component.id)
              }
              onDragIconMouseUp={(e) => handleDragIconMouseUp(e, component.id)}
            />

            {/* Module Indicators */}
            <ModuleIndicators component={component} />

            {/* Resize handles - only show when component is selected */}
            {tool === "select" && selectedComponent === component.id && (
              <div
                style={{
                  position: "absolute",
                  left: component.x,
                  top: component.y,
                  width: component.width,
                  height: component.height,
                  pointerEvents: "none",
                }}
              >
                <div style={{ pointerEvents: "all" }}>
                  <ResizeHandles
                    onResizeStart={(e, corner) =>
                      handleResizeStart(e, component.id, corner)
                    }
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Empty State */}
        {components.length === 0 && <EmptyState />}
      </div>
      {/* End Transform wrapper */}

      {/* Component Menu - Centered on canvas */}
      {renamePopup &&
        (() => {
          const component = components.find(
            (c) => c.id === renamePopup.componentId
          );
          if (!canvasRef.current) return null;

          const rect = canvasRef.current.getBoundingClientRect();
          const centerX = rect.width / 2 - 160; // 160 is half the menu width (320px)
          const centerY = rect.height / 2 - 300; // Adjust for menu height

          return (
            <div
              className="fixed z-[60]"
              style={{ left: rect.left, top: rect.top }}
            >
              <ComponentMenu
                componentId={renamePopup.componentId}
                x={centerX}
                y={centerY}
                component={component}
                onClose={() => {
                  setRenamePopup(null);
                  setApiDefinitionMenu(null);
                  setModulesMenu(null);
                }}
                onUpdate={onComponentUpdate}
                onDelete={onComponentDelete}
                onDefineApi={handleDefineApi}
                onAddModules={handleAddModules}
                menuType="component"
              />
            </div>
          );
        })()}

      {/* Connection Menu - Centered on canvas */}
      {connectionMenu &&
        (() => {
          const connection = connections.find(
            (c) => c.id === connectionMenu.connectionId
          );
          if (!canvasRef.current) return null;

          const rect = canvasRef.current.getBoundingClientRect();
          const centerX = rect.width / 2 - 160; // 160 is half the menu width (320px)
          const centerY = rect.height / 2 - 150; // Adjust for smaller menu height

          return (
            <div
              className="fixed z-[60]"
              style={{ left: rect.left, top: rect.top }}
            >
              <ComponentMenu
                componentId={connectionMenu.connectionId}
                x={centerX}
                y={centerY}
                connection={connection}
                onClose={() => setConnectionMenu(null)}
                onDelete={onConnectionDelete}
                onConnectionUpdate={handleConnectionUpdateInternal}
                showDelete={true}
                menuType="connection"
              />
            </div>
          );
        })()}

      {/* API Definition Menu - To the right of main menu */}
      {apiDefinitionMenu &&
        (() => {
          const component = components.find(
            (c) => c.id === apiDefinitionMenu.componentId
          );
          if (!canvasRef.current) return null;

          const rect = canvasRef.current.getBoundingClientRect();
          const centerX = rect.width / 2 - 160 + 340; // To the right of main menu (320px width + 20px gap)
          const centerY = rect.height / 2 - 300; // Same Y as main menu

          return (
            <div
              className="fixed z-[60]"
              style={{ left: rect.left, top: rect.top }}
            >
              <ApiDefinitionMenu
                componentId={apiDefinitionMenu.componentId}
                existingEndpoints={component?.apiEndpoints}
                x={centerX}
                y={centerY}
                onClose={() => setApiDefinitionMenu(null)}
                onSave={(componentId, endpoints) => {
                  // Update component with API endpoints
                  onComponentUpdate(componentId, { apiEndpoints: endpoints });
                  setApiDefinitionMenu(null);
                }}
              />
            </div>
          );
        })()}

      {/* Modules Menu - To the left of main menu */}
      {modulesMenu &&
        (() => {
          const component = components.find(
            (c) => c.id === modulesMenu.componentId
          );
          if (!canvasRef.current) return null;

          const rect = canvasRef.current.getBoundingClientRect();
          const centerX = rect.width / 2 - 160 - 340; // To the left of main menu (320px width + 20px gap)
          const centerY = rect.height / 2 - 300; // Same Y as main menu

          return (
            <div
              className="fixed z-[60]"
              style={{ left: rect.left, top: rect.top }}
            >
              <ModulesMenu
                componentId={modulesMenu.componentId}
                componentType={component?.type || "service"}
                existingModules={component?.modules}
                x={centerX}
                y={centerY}
                onClose={() => setModulesMenu(null)}
                onSave={(componentId, modules) => {
                  // Update component with selected modules
                  onComponentUpdate(componentId, { modules });
                  setModulesMenu(null);
                }}
              />
            </div>
          );
        })()}
    </div>
  );
}
