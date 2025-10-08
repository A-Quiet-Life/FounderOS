"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ArchitectureCanvas from "@/components/ArchitectureCanvas";
import { Component, Connection, Tool } from "@/components/ArchitectureCanvas";
import ToolButtons from "@/components/ToolButtons";
import GenerationModal from "@/components/GenerationModal";

export default function DemoPage() {
  const [tool, setTool] = useState<Tool>("select");
  const [components, setComponents] = useState<Component[]>([
    {
      id: "component-backend-1",
      x: 400,
      y: 300,
      width: 240,
      height: 160,
      label: "API Service",
      type: "service",
      language: "TypeScript",
      framework: "Express",
      modules: [
        {
          id: "stripe",
          name: "Stripe",
          description: "Payment processing",
          enabled: true,
        },
      ],
    },
    {
      id: "component-frontend-1",
      x: 800,
      y: 300,
      width: 240,
      height: 160,
      label: "Web App",
      type: "web",
      framework: "React",
      modules: [
        {
          id: "clerk",
          name: "Clerk",
          description: "Authentication and user management",
          enabled: true,
        },
      ],
    },
  ]);
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "connection-1",
      from: "component-backend-1",
      to: "component-frontend-1",
      fromSide: "right",
      toSide: "left",
      useSDK: true,
    },
  ]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(true);
  const [showGenerationModal, setShowGenerationModal] = useState(false);

  const handleCanvasClick = (x: number, y: number) => {
    // Component creation is now handled by drag, not click
  };

  const handleComponentClick = (componentId: string) => {
    setSelectedComponent(componentId);
  };

  const handleComponentUpdate = (
    componentId: string,
    updates: Partial<Component>
  ) => {
    // Check if component exists
    const exists = components.some((c) => c.id === componentId);

    if (exists) {
      // Update existing component
      setComponents(
        components.map((c) => (c.id === componentId ? { ...c, ...updates } : c))
      );
    } else {
      // Create new component (for drag-to-create)
      setComponents([...components, updates as Component]);
      // Switch back to select tool after creating
      setTool("select");
    }
  };

  const handleConnectionCreate = (
    from: string,
    to: string,
    fromSide: string,
    toSide: string
  ) => {
    // Check if connection already exists between these two components
    const exists = connections.some(
      (conn) =>
        (conn.from === from && conn.to === to) ||
        (conn.from === to && conn.to === from)
    );

    if (exists) {
      // Don't create duplicate connection
      return;
    }

    const newConnection: Connection = {
      id: `connection-${Date.now()}`,
      from,
      to,
      fromSide: fromSide as "top" | "right" | "bottom" | "left",
      toSide: toSide as "top" | "right" | "bottom" | "left",
      useSDK: false,
    };

    setConnections([...connections, newConnection]);

    // Switch back to select tool
    setTool("select");
  };

  const handleComponentDelete = (componentId: string) => {
    setComponents(components.filter((c) => c.id !== componentId));
    setConnections(
      connections.filter(
        (conn) => conn.from !== componentId && conn.to !== componentId
      )
    );
    setSelectedComponent(null);
  };

  const handleConnectionDelete = (connectionId: string) => {
    setConnections(connections.filter((conn) => conn.id !== connectionId));
  };

  const handleConnectionUpdate = (
    connectionId: string,
    updates: Partial<Connection>
  ) => {
    setConnections(
      connections.map((conn) =>
        conn.id === connectionId ? { ...conn, ...updates } : conn
      )
    );
  };

  const handleReset = () => {
    setComponents([]);
    setConnections([]);
    setSelectedComponent(null);
    setConnectionStart(null);
    setTool("select");
  };

  const handleGenerate = () => {
    console.log("Generating code from architecture...");
    console.log("Components:", components);
    console.log("Connections:", connections);
    setShowGenerationModal(true);
  };

  return (
    <div
      className="h-screen bg-zinc-950 flex flex-col"
      style={{ overscrollBehavior: "none" }}
    >
      <Navbar />

      {/* Main canvas area - takes up remaining height */}
      <div className="flex-1 relative overflow-hidden">
        <ArchitectureCanvas
          tool={tool}
          components={components}
          connections={connections}
          selectedComponent={selectedComponent}
          connectionStart={connectionStart}
          onCanvasClick={handleCanvasClick}
          onComponentClick={handleComponentClick}
          onComponentUpdate={handleComponentUpdate}
          onComponentDelete={handleComponentDelete}
          onConnectionCreate={handleConnectionCreate}
          onConnectionDelete={handleConnectionDelete}
          onConnectionUpdate={handleConnectionUpdate}
          onSelectedComponentChange={setSelectedComponent}
        />

        {/* Floating Top Controls - positioned absolutely */}
        <div className="absolute top-4 left-4 flex gap-3 z-50 animate-slide-in-top">
          {/* Tool Buttons */}
          <ToolButtons
            tool={tool}
            onToolChange={setTool}
            onReset={handleReset}
            onHelp={() => setShowHelp(!showHelp)}
          />

          {/* Generate Button - width of 2 tool buttons */}
          <button
            onClick={handleGenerate}
            disabled={components.length === 0}
            className="h-14 w-[148px] px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-base rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-red-500 disabled:hover:to-orange-500"
          >
            Generate Code
          </button>
        </div>

        {/* Floating Help Panel - positioned absolutely on right side */}
        {showHelp && (
          <div className="absolute top-4 right-4 w-90 p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 animate-slide-in-top delay-200">
            <h2 className="text-xl text-zinc-100 font-semibold mb-2">
              How to use our tech demo:
            </h2>
            <ul className="text-zinc-400 text-sm space-y-1 list-disc list-inside">
              <li>
                Click <strong className="text-zinc-300">"Add Component"</strong>{" "}
                then click and drag on the canvas to create a service or client
              </li>
              <li>
                <strong className="text-zinc-300">Click</strong> any component
                to configure its type, language, and framework
              </li>
              <li>
                <strong className="text-zinc-300">Drag</strong> components to
                move them around the canvas
              </li>
              <li>
                <strong className="text-zinc-300">Resize</strong> components by
                dragging the corner handles when selected
              </li>
              <li>
                Click{" "}
                <strong className="text-zinc-300">"Add Connection"</strong>,
                click a component, then click another to create an arrow
              </li>
              <li>
                <strong className="text-zinc-300">Zoom & Pan:</strong> Use
                trackpad pinch to zoom, or click and drag empty space to pan
              </li>
              <li>
                Click <strong className="text-zinc-300">"Generate Code"</strong>{" "}
                to transform your architecture into working code
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Generation Modal */}
      <GenerationModal
        isOpen={showGenerationModal}
        onClose={() => setShowGenerationModal(false)}
        components={components}
        connections={connections}
      />
    </div>
  );
}
