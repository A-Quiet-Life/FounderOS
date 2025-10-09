"use client";

import { GripVertical, Database, Monitor, Smartphone } from "lucide-react";
import type { Component, Tool } from "./types";

interface ComponentNodeProps {
  component: Component;
  tool: Tool;
  isSelected: boolean;
  isDragging: boolean;
  isConnectionSource: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
  onClick: (e: React.MouseEvent) => void;
  onDragIconMouseDown: (e: React.MouseEvent) => void;
  onDragIconMouseUp: (e: React.MouseEvent) => void;
}

// Track which components have been interacted with (never animate again)
const interactedComponents = new Set<string>();

export default function ComponentNode({
  component,
  tool,
  isSelected,
  isDragging,
  isConnectionSource,
  onMouseDown,
  onMouseUp,
  onClick,
  onDragIconMouseDown,
  onDragIconMouseUp,
}: ComponentNodeProps) {
  // Animate default components on initial load
  const isDefaultComponent =
    component.id.includes("backend-1") || component.id.includes("frontend-1");
  const animationDelay = component.id.includes("backend-1")
    ? "delay-400"
    : component.id.includes("frontend-1")
    ? "delay-500"
    : "";

  // Mark as interacted when selected or dragged
  if (isSelected || isDragging) {
    interactedComponents.add(component.id);
  }

  // Only show animation if it's a default component that has never been interacted with
  const showAnimation =
    isDefaultComponent && !interactedComponents.has(component.id);

  return (
    <div
      onClick={onClick}
      onMouseDown={tool === "select" ? onDragIconMouseDown : onMouseDown}
      onMouseUp={tool === "select" ? onDragIconMouseUp : onMouseUp}
      className={`absolute border-2 rounded-lg px-4 py-3 bg-zinc-800 ${
        isDragging ? "" : "transition-all"
      } ${tool === "connection" ? "select-none" : ""} ${
        isSelected
          ? "border-orange-500 shadow-lg shadow-orange-500/30"
          : isConnectionSource
          ? "border-blue-500 shadow-lg shadow-blue-500/30"
          : isDragging
          ? "border-yellow-500 shadow-lg shadow-yellow-500/30"
          : "border-zinc-700"
      } hover:bg-zinc-700 ${
        tool === "select" ? "cursor-move" : "cursor-pointer"
      } ${showAnimation ? `animate-pop-in ${animationDelay}` : ""}`}
      style={{
        left: component.x,
        top: component.y,
        width: component.width,
        height: component.height,
        zIndex: isDragging ? 100 : 2,
      }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <div className="text-zinc-100 font-medium text-sm truncate">
              {component.label}
            </div>
            {/* Type, Language, Framework info */}
            <div className="flex items-center gap-1 mt-0.5 flex-wrap">
              <span
                className={`inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded ${
                  component.type === "web"
                    ? "bg-purple-600/50 text-purple-200"
                    : component.type === "mobile"
                    ? "bg-pink-600/50 text-pink-200"
                    : component.type === "database"
                    ? "bg-green-600/50 text-green-200"
                    : "bg-blue-600/50 text-blue-200"
                }`}
              >
                {component.type === "web" && <Monitor size={10} />}
                {component.type === "mobile" && <Smartphone size={10} />}
                {component.type === "database" && <Database size={10} />}
                {component.type === "service" && <Database size={10} />}
                {component.type === "web"
                  ? "Web"
                  : component.type === "mobile"
                  ? "Mobile"
                  : component.type === "database"
                  ? "Database"
                  : "Service"}
              </span>
            </div>

            {/* Modules and API info */}
            <div className="flex items-center gap-1 mt-1 flex-wrap">
              {component.modules && component.modules.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-600/50 text-green-200">
                  {component.modules.length} module
                  {component.modules.length !== 1 ? "s" : ""}
                </span>
              )}
              {component.apiEndpoints && component.apiEndpoints.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-600/50 text-orange-200">
                  {component.apiEndpoints.length} endpoint
                  {component.apiEndpoints.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
