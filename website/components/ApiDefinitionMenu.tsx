"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import type { Endpoint } from "./canvas/types";

interface ApiDefinitionMenuProps {
  componentId: string;
  x: number;
  y: number;
  existingEndpoints?: Endpoint[];
  onClose: () => void;
  onSave: (componentId: string, endpoints: Endpoint[]) => void;
}

export default function ApiDefinitionMenu({
  componentId,
  x,
  y,
  existingEndpoints = [],
  onClose,
  onSave,
}: ApiDefinitionMenuProps) {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(
    existingEndpoints.length > 0
      ? existingEndpoints
      : [{ id: "1", name: "", statusCode: "200", jsonData: "" }]
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x, y });

  const addEndpoint = () => {
    setEndpoints([
      ...endpoints,
      { id: Date.now().toString(), name: "", statusCode: "200", jsonData: "" },
    ]);
  };

  const removeEndpoint = (id: string) => {
    setEndpoints(endpoints.filter((e) => e.id !== id));
  };

  const updateEndpoint = (id: string, field: keyof Endpoint, value: string) => {
    setEndpoints(
      endpoints.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleSave = () => {
    onSave(componentId, endpoints);
    onClose();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      className="absolute bg-zinc-800 border-2 border-orange-500 rounded-lg shadow-xl z-50 max-h-[500px] overflow-y-auto"
      style={{
        left: position.x,
        top: position.y,
        width: "350px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="flex items-center justify-between mb-3 p-4 pb-2 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="text-zinc-100 font-semibold text-sm">
          Define API Endpoints
        </span>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-100"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <X size={16} />
        </button>
      </div>
      <div className="px-4 pb-4">
        <div className="space-y-3">
          {endpoints.map((endpoint, index) => (
            <div
              key={endpoint.id}
              className="bg-zinc-900 p-3 rounded-lg border border-zinc-700"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-300 text-xs font-medium">
                  Endpoint {index + 1}
                </span>
                {endpoints.length > 1 && (
                  <button
                    onClick={() => removeEndpoint(endpoint.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {/* Endpoint Name */}
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">
                    Endpoint Name
                  </label>
                  <input
                    type="text"
                    value={endpoint.name}
                    onChange={(e) =>
                      updateEndpoint(endpoint.id, "name", e.target.value)
                    }
                    placeholder="/api/users"
                    className="w-full px-2 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-100 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Status Code */}
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">
                    Status Code
                  </label>
                  <select
                    value={endpoint.statusCode}
                    onChange={(e) =>
                      updateEndpoint(endpoint.id, "statusCode", e.target.value)
                    }
                    className="w-full px-2 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-100 text-sm focus:outline-none focus:border-orange-500"
                  >
                    <option value="200">200 - OK</option>
                    <option value="201">201 - Created</option>
                    <option value="204">204 - No Content</option>
                    <option value="400">400 - Bad Request</option>
                    <option value="401">401 - Unauthorized</option>
                    <option value="404">404 - Not Found</option>
                    <option value="500">500 - Internal Server Error</option>
                  </select>
                </div>

                {/* JSON Data */}
                <div>
                  <label className="block text-zinc-400 text-xs mb-1">
                    Response JSON
                  </label>
                  <textarea
                    value={endpoint.jsonData}
                    onChange={(e) =>
                      updateEndpoint(endpoint.id, "jsonData", e.target.value)
                    }
                    placeholder='{"key": "value"}'
                    rows={3}
                    className="w-full px-2 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-100 text-xs font-mono focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Endpoint Button */}
          <button
            onClick={addEndpoint}
            className="w-full py-2 bg-zinc-700 text-zinc-100 text-sm font-medium rounded hover:bg-zinc-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Endpoint
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold rounded hover:from-red-600 hover:to-orange-600"
          >
            Save API Definition
          </button>
        </div>
      </div>
    </div>
  );
}
