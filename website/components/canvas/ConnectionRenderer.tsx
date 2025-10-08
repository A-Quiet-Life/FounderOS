"use client";

import type { Component, Connection } from "./types";

interface ConnectionRendererProps {
  connections: Connection[];
  components: Component[];
  dragConnection: {
    from: string;
    fromSide: "top" | "right" | "bottom" | "left";
    mouseX: number;
    mouseY: number;
  } | null;
  onConnectionClick: (
    e: React.MouseEvent,
    connectionId: string,
    x: number,
    y: number
  ) => void;
}

export default function ConnectionRenderer({
  connections,
  components,
  dragConnection,
  onConnectionClick,
}: ConnectionRendererProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, overflow: "visible" }}
    >
      {/* Existing Connections */}
      {connections.map((connection) => {
        const fromComp = components.find((c) => c.id === connection.from);
        const toComp = components.find((c) => c.id === connection.to);
        if (!fromComp || !toComp) return null;

        // Simple straight line from center to center
        const fromPoint = {
          x: fromComp.x + fromComp.width / 2,
          y: fromComp.y + fromComp.height / 2,
        };
        const toPoint = {
          x: toComp.x + toComp.width / 2,
          y: toComp.y + toComp.height / 2,
        };

        // Calculate midpoint for click detection
        const midPoint = {
          x: (fromPoint.x + toPoint.x) / 2,
          y: (fromPoint.y + toPoint.y) / 2,
        };

        // Animate default connection
        const isDefaultConnection = connection.id === "connection-1";

        return (
          <g key={connection.id}>
            {/* Invisible thick line for easier clicking */}
            <line
              x1={fromPoint.x}
              y1={fromPoint.y}
              x2={toPoint.x}
              y2={toPoint.y}
              stroke="transparent"
              strokeWidth="30"
              className="cursor-pointer"
              style={{ pointerEvents: "stroke" }}
              onClick={(e) =>
                onConnectionClick(e, connection.id, midPoint.x, midPoint.y)
              }
            />
            {/* Visible line */}
            <line
              x1={fromPoint.x}
              y1={fromPoint.y}
              x2={toPoint.x}
              y2={toPoint.y}
              stroke="#52525b"
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
              className={isDefaultConnection ? "animate-draw-line" : ""}
              style={{
                pointerEvents: "none",
                animationDelay: isDefaultConnection ? "800ms" : "0ms",
              }}
            />
          </g>
        );
      })}

      {/* Dragging connection line - simple straight line */}
      {dragConnection &&
        (() => {
          const fromComp = components.find((c) => c.id === dragConnection.from);
          if (!fromComp) return null;

          // Simple straight line from component center to mouse
          const fromPoint = {
            x: fromComp.x + fromComp.width / 2,
            y: fromComp.y + fromComp.height / 2,
          };
          const toPoint = {
            x: dragConnection.mouseX,
            y: dragConnection.mouseY,
          };

          return (
            <line
              x1={fromPoint.x}
              y1={fromPoint.y}
              x2={toPoint.x}
              y2={toPoint.y}
              stroke="rgba(59, 130, 246, 0.8)"
              strokeWidth="3"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead-drag)"
            />
          );
        })()}

      <defs>
        <marker
          id="arrowhead"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
        >
          <polygon points="0 0, 12 6, 0 12" fill="#52525b" />
        </marker>
        <marker
          id="arrowhead-drag"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
        >
          <polygon points="0 0, 12 6, 0 12" fill="rgba(59, 130, 246, 0.8)" />
        </marker>
      </defs>
    </svg>
  );
}
