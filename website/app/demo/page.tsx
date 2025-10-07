"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ArchitectureCanvas, {
  Component,
  Connection,
  Tool,
} from "@/components/ArchitectureCanvas";
import ToolButtons from "@/components/ToolButtons";
import GenerationModal from "@/components/GenerationModal";

export default function DemoPage() {
  const [tool, setTool] = useState<Tool>("select");
  const [components, setComponents] = useState<Component[]>([
    {
      id: "component-backend-1",
      x: 160,
      y: 160,
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
      x: 560,
      y: 160,
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
    };
    setConnections([...connections, newConnection]);

    // Switch back to select mode after creating connection
    setTool("select");
  };

  const handleComponentDelete = (componentId: string) => {
    // Remove the component
    setComponents(components.filter((c) => c.id !== componentId));
    // Remove any connections associated with this component
    setConnections(
      connections.filter(
        (conn) => conn.from !== componentId && conn.to !== componentId
      )
    );
    // Clear selection
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
      connections.map((c) => (c.id === connectionId ? { ...c, ...updates } : c))
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
      className="min-h-screen bg-zinc-950"
      style={{ overscrollBehavior: "none" }}
    >
      <Navbar />

      <div className="pt-8 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex gap-6">
            {/* Left side - Canvas and controls */}
            <div className="flex-1">
              {/* Canvas */}
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

              {/* Bottom Controls */}
              <div className="flex gap-3 mt-4">
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
            </div>

            {/* Right side - Help Panel */}
            {showHelp && (
              <div className="w-80 p-4 bg-zinc-900 border border-zinc-800 rounded-xl h-fit">
                <h3 className="text-zinc-100 font-semibold mb-2">
                  How to use:
                </h3>
                <ul className="text-zinc-400 text-sm space-y-1 list-disc list-inside">
                  <li>
                    Click{" "}
                    <strong className="text-zinc-300">"Add Component"</strong>{" "}
                    then click and drag on the canvas to create a service or
                    client
                  </li>
                  <li>
                    <strong className="text-zinc-300">Click</strong> any
                    component to configure its type, language, and framework
                  </li>
                  <li>
                    <strong className="text-zinc-300">Hold and drag</strong> the
                    grip icon to move components
                  </li>
                  <li>
                    <strong className="text-zinc-300">Resize</strong> components
                    by dragging the corner handles when selected
                  </li>
                  <li>
                    Click{" "}
                    <strong className="text-zinc-300">"Add Connection"</strong>,
                    click a component, then click another to create an arrow
                  </li>
                  <li>
                    <strong className="text-zinc-300">Zoom & Pan:</strong> Use
                    trackpad pinch to zoom, scroll to pan, or hold Shift while
                    clicking and dragging
                  </li>
                  <li>
                    Click{" "}
                    <strong className="text-zinc-300">"Generate Code"</strong>{" "}
                    to transform your architecture into working code
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
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
