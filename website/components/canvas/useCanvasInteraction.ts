import { useState, useRef, useEffect } from "react";
import type { Component, Tool } from "./types";
import { GRID_SIZE } from "./types";

interface UseCanvasInteractionProps {
  tool: Tool;
  components: Component[];
  onComponentUpdate: (componentId: string, updates: Partial<Component>) => void;
}

export function useCanvasInteraction({
  tool,
  components,
  onComponentUpdate,
}: UseCanvasInteractionProps) {
  const [resizing, setResizing] = useState<{
    id: string;
    corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    startX: number;
    startY: number;
    startComponentX: number;
    startComponentY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  const [dragging, setDragging] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const [creatingComponent, setCreatingComponent] = useState<{
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
  } | null>(null);

  const [dragConnection, setDragConnection] = useState<{
    from: string;
    fromSide: "top" | "right" | "bottom" | "left";
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const [dragIntent, setDragIntent] = useState<{
    componentId: string;
    startTime: number;
    startX: number;
    startY: number;
    enabled: boolean;
  } | null>(null);

  const dragTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (dragTimerRef.current) {
        clearTimeout(dragTimerRef.current);
      }
    };
  }, []);

  // Mouse move handler for resizing, dragging, creating, and drag connection
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizing) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const deltaX = mouseX - resizing.startX;
        const deltaY = mouseY - resizing.startY;

        let newX = resizing.startComponentX;
        let newY = resizing.startComponentY;
        let newWidth = resizing.startWidth;
        let newHeight = resizing.startHeight;

        // Calculate new dimensions based on corner
        switch (resizing.corner) {
          case "top-left":
            newX = resizing.startComponentX + deltaX;
            newY = resizing.startComponentY + deltaY;
            newWidth = resizing.startWidth - deltaX;
            newHeight = resizing.startHeight - deltaY;
            break;
          case "top-right":
            newY = resizing.startComponentY + deltaY;
            newWidth = resizing.startWidth + deltaX;
            newHeight = resizing.startHeight - deltaY;
            break;
          case "bottom-left":
            newX = resizing.startComponentX + deltaX;
            newWidth = resizing.startWidth - deltaX;
            newHeight = resizing.startHeight + deltaY;
            break;
          case "bottom-right":
            newWidth = resizing.startWidth + deltaX;
            newHeight = resizing.startHeight + deltaY;
            break;
        }

        // Ensure minimum size
        if (newWidth < GRID_SIZE) {
          newWidth = GRID_SIZE;
          if (
            resizing.corner === "top-left" ||
            resizing.corner === "bottom-left"
          ) {
            newX = resizing.startComponentX + resizing.startWidth - GRID_SIZE;
          }
        }
        if (newHeight < GRID_SIZE) {
          newHeight = GRID_SIZE;
          if (
            resizing.corner === "top-left" ||
            resizing.corner === "top-right"
          ) {
            newY = resizing.startComponentY + resizing.startHeight - GRID_SIZE;
          }
        }

        // Snap to grid
        newX = Math.round(newX / GRID_SIZE) * GRID_SIZE;
        newY = Math.round(newY / GRID_SIZE) * GRID_SIZE;
        newWidth = Math.round(newWidth / GRID_SIZE) * GRID_SIZE;
        newHeight = Math.round(newHeight / GRID_SIZE) * GRID_SIZE;

        onComponentUpdate(resizing.id, {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        });
      }

      if (creatingComponent) {
        setCreatingComponent({
          ...creatingComponent,
          currentX: e.clientX,
          currentY: e.clientY,
        });
      }

      if (dragging) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const newX = mouseX - dragging.offsetX;
        const newY = mouseY - dragging.offsetY;

        const snappedX = Math.round(newX / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round(newY / GRID_SIZE) * GRID_SIZE;

        onComponentUpdate(dragging.id, { x: snappedX, y: snappedY });
      }

      if (dragConnection) {
        setDragConnection({
          ...dragConnection,
          mouseX: e.clientX,
          mouseY: e.clientY,
        });
      }
    };

    const handleMouseUp = () => {
      setResizing(null);
      setDragging(null);

      // Finalize component creation
      if (creatingComponent) {
        const x = Math.min(
          creatingComponent.startX,
          creatingComponent.currentX
        );
        const y = Math.min(
          creatingComponent.startY,
          creatingComponent.currentY
        );
        const width = Math.abs(
          creatingComponent.currentX - creatingComponent.startX
        );
        const height = Math.abs(
          creatingComponent.currentY - creatingComponent.startY
        );

        if (width > 40 && height > 40) {
          const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
          const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;
          const snappedWidth = Math.max(
            GRID_SIZE,
            Math.round(width / GRID_SIZE) * GRID_SIZE
          );
          const snappedHeight = Math.max(
            GRID_SIZE,
            Math.round(height / GRID_SIZE) * GRID_SIZE
          );

          const newComponent: Component = {
            id: `component-${Date.now()}`,
            x: snappedX,
            y: snappedY,
            width: snappedWidth,
            height: snappedHeight,
            label: `Service ${components.length + 1}`,
            type: "service",
            language: "TypeScript",
            framework: "",
            modules: [],
          };

          onComponentUpdate(newComponent.id, newComponent);
        }

        setCreatingComponent(null);
      }
    };

    if (resizing || dragging || dragConnection || creatingComponent) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [
    resizing,
    dragging,
    dragConnection,
    creatingComponent,
    components,
    onComponentUpdate,
  ]);

  return {
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
  };
}
