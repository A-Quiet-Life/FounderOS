"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

interface Module {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  authType?: "api_key" | "oauth";
}

interface ModulesMenuProps {
  componentId: string;
  componentType: "web" | "mobile" | "service" | "database";
  x: number;
  y: number;
  existingModules?: Module[];
  onClose: () => void;
  onSave: (componentId: string, modules: Module[]) => void;
}

interface AvailableModule {
  id: string;
  name: string;
  description: string;
  requiresAuthType?: boolean;
}

const CLIENT_MODULES: AvailableModule[] = [
  {
    id: "clerk",
    name: "Clerk",
    description:
      "User authentication and management with prebuilt UI components",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing and subscription management for your app",
  },
  {
    id: "posthog",
    name: "PostHog",
    description: "Product analytics, feature flags, and session recording",
  },
];

const SERVICE_MODULES: AvailableModule[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Server-side payment processing and webhook handling",
  },
  {
    id: "redis",
    name: "Redis",
    description: "In-memory data store for caching and session management",
  },
  {
    id: "bullmq",
    name: "BullMQ",
    description: "Queue and job processing for background tasks",
  },
  {
    id: "auth",
    name: "Authentication",
    description: "Add authentication to your API endpoints",
    requiresAuthType: true,
  },
];

export default function ModulesMenu({
  componentId,
  componentType,
  x,
  y,
  existingModules = [],
  onClose,
  onSave,
}: ModulesMenuProps) {
  const availableModules =
    componentType === "web" || componentType === "mobile"
      ? CLIENT_MODULES
      : componentType === "database"
      ? []
      : SERVICE_MODULES;

  const [modules, setModules] = useState<Module[]>(
    availableModules.map((m) => {
      const existing = existingModules.find((em) => em.id === m.id);
      return {
        id: m.id,
        name: m.name,
        description: m.description,
        enabled: existing ? existing.enabled : false,
        authType: existing?.authType,
      };
    })
  );

  const [showAuthOptions, setShowAuthOptions] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x, y });

  const toggleModule = (id: string) => {
    const module = modules.find((m) => m.id === id);
    const availableModule = availableModules.find((m) => m.id === id);

    if (availableModule?.requiresAuthType && !module?.enabled) {
      // Show auth type selection for authentication module
      setShowAuthOptions(id);
    } else {
      setModules(
        modules.map((m) =>
          m.id === id ? { ...m, enabled: !m.enabled, authType: undefined } : m
        )
      );
      if (showAuthOptions === id) {
        setShowAuthOptions(null);
      }
    }
  };

  const setAuthType = (id: string, authType: "api_key" | "oauth") => {
    setModules(
      modules.map((m) => (m.id === id ? { ...m, enabled: true, authType } : m))
    );
    setShowAuthOptions(null);
  };

  const handleSave = () => {
    onSave(
      componentId,
      modules.filter((m) => m.enabled)
    );
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
      className="absolute bg-zinc-800 border-2 border-orange-500 rounded-lg shadow-xl z-50"
      style={{
        left: position.x,
        top: position.y,
        width: "350px",
        maxHeight: "500px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="flex items-center justify-between mb-3 p-4 pb-2 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="text-zinc-100 font-semibold text-sm">Add Modules</span>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-100"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <X size={16} />
        </button>
      </div>
      <div className="px-4 pb-4">
        {/* Scrollable Module List */}
        <div className="space-y-2 max-h-[380px] overflow-y-auto mb-3">
          {modules.map((module) => {
            const availableModule = availableModules.find(
              (m) => m.id === module.id
            );
            const isShowingAuthOptions = showAuthOptions === module.id;

            return (
              <div
                key={module.id}
                className={`border rounded-lg p-3 transition-all ${
                  module.enabled
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-zinc-700 bg-zinc-900"
                }`}
              >
                <div
                  className="flex items-start gap-3 cursor-pointer"
                  onClick={() => toggleModule(module.id)}
                >
                  {/* Checkbox */}
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all ${
                      module.enabled
                        ? "border-orange-500 bg-orange-500"
                        : "border-zinc-600 bg-zinc-800"
                    }`}
                  >
                    {module.enabled && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>

                  {/* Module Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-100 font-medium text-sm">
                        {module.name}
                      </span>
                      {module.authType && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600/50 text-blue-200">
                          {module.authType === "api_key" ? "API Key" : "OAuth"}
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-xs mt-1">
                      {module.description}
                    </p>
                  </div>
                </div>

                {/* Auth Type Selection */}
                {isShowingAuthOptions && availableModule?.requiresAuthType && (
                  <div className="mt-3 pt-3 border-t border-zinc-700">
                    <p className="text-zinc-300 text-xs mb-2">
                      Choose authentication type:
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAuthType(module.id, "api_key");
                        }}
                        className="flex-1 py-2 px-3 bg-zinc-700 text-zinc-100 text-xs font-medium rounded hover:bg-zinc-600 transition-colors"
                      >
                        API Key
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAuthType(module.id, "oauth");
                        }}
                        className="flex-1 py-2 px-3 bg-zinc-700 text-zinc-100 text-xs font-medium rounded hover:bg-zinc-600 transition-colors"
                      >
                        OAuth
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold rounded hover:from-red-600 hover:to-orange-600"
        >
          Save Modules
        </button>
      </div>
    </div>
  );
}
