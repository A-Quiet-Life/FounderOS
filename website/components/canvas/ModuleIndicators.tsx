import type { Component, Module } from "./types";

interface ModuleIndicatorsProps {
  component: Component;
}

export default function ModuleIndicators({ component }: ModuleIndicatorsProps) {
  if (!component.modules || component.modules.length === 0) {
    return null;
  }

  const moduleHeight = 20;
  const gap = 4;
  const startY = component.y + component.height + gap;

  return (
    <>
      {component.modules.map((module, index) => {
        const x = component.x;
        const y = startY + index * (moduleHeight + gap);

        return (
          <div
            key={`${component.id}-${module.id}`}
            className="absolute bg-zinc-700 border border-zinc-600 rounded px-2 py-1 flex items-center text-zinc-300 text-[10px] font-medium pointer-events-none select-none"
            style={{
              left: x,
              top: y,
              height: moduleHeight,
              zIndex: 1,
              whiteSpace: "nowrap",
            }}
          >
            {module.name}
            {module.authType && (
              <span className="ml-1.5 text-[9px] px-1 py-0.5 rounded bg-blue-600/50 text-blue-200">
                {module.authType === "api_key" ? "API Key" : "OAuth"}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
}
