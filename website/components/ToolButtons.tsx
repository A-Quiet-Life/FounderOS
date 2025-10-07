"use client";

import { Plus, Cable, RotateCcw, HelpCircle } from "lucide-react";
import { Tool } from "./ArchitectureCanvas";

interface ToolButtonsProps {
  tool: Tool;
  onToolChange: (tool: Tool) => void;
  onReset: () => void;
  onHelp: () => void;
}

export default function ToolButtons({
  tool,
  onToolChange,
  onReset,
  onHelp,
}: ToolButtonsProps) {
  const handleToolClick = (newTool: Tool) => {
    // Toggle: if clicking the active tool, switch to select
    if (tool === newTool) {
      onToolChange("select");
    } else {
      onToolChange(newTool);
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={() => handleToolClick("component")}
        className={`h-14 px-4 rounded-xl transition-all border-2 ${
          tool === "component"
            ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/30"
            : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:border-zinc-600"
        }`}
        title="Add Component"
      >
        <Plus size={24} className="mx-auto" />
      </button>

      <button
        onClick={() => handleToolClick("connection")}
        className={`h-14 px-4 rounded-xl transition-all border-2 ${
          tool === "connection"
            ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/30"
            : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:border-zinc-600"
        }`}
        title="Add Connection"
      >
        <Cable size={24} className="mx-auto" />
      </button>

      {/* Divider */}
      <div className="w-px bg-zinc-700 mx-1" />

      <button
        onClick={onReset}
        className="h-14 px-4 rounded-xl transition-all border-2 bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-red-900 hover:border-red-700 hover:text-red-300"
        title="Reset Canvas"
      >
        <RotateCcw size={24} className="mx-auto" />
      </button>

      <button
        onClick={onHelp}
        className="h-14 px-4 rounded-xl transition-all border-2 bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:border-zinc-600"
        title="Help"
      >
        <HelpCircle size={24} className="mx-auto" />
      </button>
    </div>
  );
}
