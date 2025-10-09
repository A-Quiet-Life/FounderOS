"use client";

import React, { useState, useEffect } from "react";
import { X, Database, Monitor, HelpCircle } from "lucide-react";
import type { Component } from "./ArchitectureCanvas";

interface ComponentMenuProps {
  componentId: string;
  x: number;
  y: number;
  component?: Component;
  onClose: () => void;
  onUpdate?: (componentId: string, updates: Partial<Component>) => void;
  onDelete?: (componentId: string) => void;
  showDelete?: boolean;
  menuType?: "component" | "connection";
  onDefineApi?: (componentId: string) => void;
  onAddModules?: (componentId: string) => void;
  connection?: { useSDK?: boolean };
  onConnectionUpdate?: (
    connectionId: string,
    updates: { useSDK: boolean }
  ) => void;
}

// Framework options per language
const SERVICE_FRAMEWORKS: Record<string, string[]> = {
  TypeScript: ["Express", "NestJS", "Fastify", "Koa"],
  Python: ["FastAPI", "Django", "Flask", "Tornado"],
  Go: ["Gin", "Echo", "Fiber", "Chi"],
  Rust: ["Axum", "Actix", "Rocket"],
  Java: ["Spring Boot", "Quarkus", "Micronaut"],
};

const WEB_CLIENT_FRAMEWORKS = ["React", "Next.js", "Nuxt", "Vue"];

const MOBILE_CLIENT_FRAMEWORKS = ["React Native", "Flutter"];

const DATABASE_FRAMEWORKS = ["PostgreSQL", "MongoDB", "SQLite"];

export default function ComponentMenu({
  componentId,
  x,
  y,
  component,
  onClose,
  onUpdate,
  onDelete,
  showDelete = false,
  menuType = "component",
  onDefineApi,
  onAddModules,
  connection,
  onConnectionUpdate,
}: ComponentMenuProps) {
  const [label, setLabel] = useState(component?.label || "");
  const [type, setType] = useState<"web" | "mobile" | "service" | "database">(
    component?.type || "service"
  );
  const [language, setLanguage] = useState(component?.language || "TypeScript");
  const [framework, setFramework] = useState(component?.framework || "");
  const [useSDK, setUseSDK] = useState(connection?.useSDK || false);
  const [showSDKTooltip, setShowSDKTooltip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x, y });

  const handleSave = () => {
    if (onUpdate && label.trim()) {
      onUpdate(componentId, {
        label: label.trim(),
        type,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(componentId);
      onClose();
    }
  };

  const handleClose = () => {
    // Auto-save on close
    if (onUpdate && label.trim()) {
      onUpdate(componentId, {
        label: label.trim(),
        type,
      });
    }
    onClose();
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // Reset framework when language changes
    setFramework("");
  };

  const availableFrameworks =
    type === "web"
      ? WEB_CLIENT_FRAMEWORKS
      : type === "mobile"
      ? MOBILE_CLIENT_FRAMEWORKS
      : type === "database"
      ? DATABASE_FRAMEWORKS
      : SERVICE_FRAMEWORKS[language] || [];

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
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
      className="absolute bg-zinc-800 border-2 border-orange-500 rounded-lg shadow-xl z-50 max-h-[600px] overflow-y-auto"
      style={{
        left: position.x,
        top: position.y,
        width: "320px",
        pointerEvents: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => {
        // Stop propagation to prevent canvas pan, but don't prevent default
        // so input fields can still receive focus
        e.stopPropagation();
      }}
    >
      <div
        className="flex items-center justify-between mb-3 p-4 pb-2 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="text-zinc-100 font-semibold text-sm">
          {menuType === "connection" ? "Connection" : "Configure Component"}
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
        {menuType === "component" && onUpdate && (
          <div className="space-y-3">
            {/* Label Input */}
            <div>
              <label className="block text-zinc-300 text-xs font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-zinc-100 text-sm focus:outline-none focus:border-orange-500"
                placeholder="Component name"
                autoFocus
              />
            </div>

            {/* Type Toggle */}
            <div>
              <label className="block text-zinc-300 text-xs font-medium mb-2">
                Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setType("service");
                    if (onUpdate && component) {
                      onUpdate(componentId, { type: "service" });
                    }
                  }}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded text-sm font-medium transition-colors ${
                    type === "service"
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  }`}
                >
                  <Database size={14} />
                  Service
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setType("web");
                    if (onUpdate && component) {
                      onUpdate(componentId, {
                        type: "web",
                      });
                    }
                  }}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded text-sm font-medium transition-colors ${
                    type === "web"
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  }`}
                >
                  <Monitor size={14} />
                  Web
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setType("mobile");
                    if (onUpdate && component) {
                      onUpdate(componentId, {
                        type: "mobile",
                      });
                    }
                  }}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded text-sm font-medium transition-colors ${
                    type === "mobile"
                      ? "bg-pink-600 text-white"
                      : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  }`}
                >
                  <Monitor size={14} />
                  Mobile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setType("database");
                    if (onUpdate && component) {
                      onUpdate(componentId, {
                        type: "database",
                      });
                    }
                  }}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded text-sm font-medium transition-colors ${
                    type === "database"
                      ? "bg-green-600 text-white"
                      : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  }`}
                >
                  <Database size={14} />
                  Database
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              {type === "service" && onDefineApi && (
                <button
                  type="button"
                  onClick={() => onDefineApi(componentId)}
                  className="w-full py-2 bg-zinc-700 text-zinc-100 text-sm font-medium rounded hover:bg-zinc-600 transition-colors"
                >
                  Define API
                </button>
              )}

              {onAddModules && type !== "database" && (
                <button
                  type="button"
                  onClick={() => onAddModules(componentId)}
                  className="w-full py-2 bg-zinc-700 text-zinc-100 text-sm font-medium rounded hover:bg-zinc-600 transition-colors"
                >
                  Add Modules
                </button>
              )}

              <button
                onClick={handleSave}
                className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold rounded hover:from-red-600 hover:to-orange-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {menuType === "connection" && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={useSDK}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    setUseSDK(newValue);
                    if (onConnectionUpdate) {
                      onConnectionUpdate(componentId, { useSDK: newValue });
                    }
                  }}
                  className="w-4 h-4 text-orange-500 bg-zinc-900 border-zinc-700 rounded focus:ring-orange-500 focus:ring-2"
                />
                <span className="text-zinc-100 text-sm">Use SDK</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setShowSDKTooltip(true)}
                  onMouseLeave={() => setShowSDKTooltip(false)}
                  className="text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  <HelpCircle size={16} />
                </button>
                {showSDKTooltip && (
                  <div
                    className="fixed left-auto right-auto w-64 bg-zinc-900 border border-zinc-700 rounded-lg p-3 shadow-xl z-[9999] pointer-events-none"
                    style={{
                      left: `${position.x + 320 + 20}px`,
                      top: `${position.y + 340}px`,
                    }}
                  >
                    <p className="text-zinc-300 text-xs leading-relaxed">
                      When enabled, a type-safe SDK will be generated for this
                      connection, providing typed methods and interfaces for the
                      target service.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete button for components */}
        {menuType === "component" && onDelete && (
          <button
            onClick={handleDelete}
            className="mt-3 w-full py-2 bg-red-500/80 text-white text-sm font-semibold rounded hover:bg-red-600/90 transition-colors"
          >
            Delete Service
          </button>
        )}

        {/* Delete button for connections */}
        {showDelete && onDelete && menuType === "connection" && (
          <button
            onClick={handleDelete}
            className="mt-3 w-full py-2 bg-red-500/80 text-white text-sm font-semibold rounded hover:bg-red-600/90 transition-colors"
          >
            Delete Connection
          </button>
        )}
      </div>
    </div>
  );
}
