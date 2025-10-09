"use client";

import { useState, useEffect } from "react";
import { GripVertical, Database, Monitor } from "lucide-react";

const GRID_SIZE = 40;

interface AnimatedDemoProps {
  type?: "overview" | "api-config";
}

export default function AnimatedDemo({ type = "overview" }: AnimatedDemoProps) {
  const [mousePos, setMousePos] = useState({ x: 20, y: 150 });
  const [showBackendMenu, setShowBackendMenu] = useState(false);
  const [showFrontendMenu, setShowFrontendMenu] = useState(false);
  const [showConnection, setShowConnection] = useState(false);
  const [highlightBackend, setHighlightBackend] = useState(false);
  const [highlightFrontend, setHighlightFrontend] = useState(false);
  const [highlightConnection, setHighlightConnection] = useState(false);
  const [showApiMenu, setShowApiMenu] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Backend component position - centered
  const backend = { x: 60, y: 100, width: 200, height: 140 };
  // Frontend component position - centered
  const frontend = { x: 340, y: 100, width: 200, height: 140 };

  useEffect(() => {
    const overviewAnimation = async () => {
      // Show connection from the start
      setShowConnection(true);

      // Start from left side
      const startX = 20;
      const startY = backend.y + backend.height / 2;
      setMousePos({ x: startX, y: startY });
      await wait(500);

      // Step 1: Move cursor to backend component (1s)
      let currentPos = await animateMouseTo(
        startX,
        startY,
        backend.x + backend.width / 2,
        backend.y + backend.height / 2,
        1000
      );
      setAnimationStep(1);
      setHighlightBackend(true);

      // Step 2: Show backend menu (1.5s)
      setShowBackendMenu(true);
      await wait(1500);

      // Step 3: Hide menu and move to connection midpoint (1s)
      setShowBackendMenu(false);
      setHighlightBackend(false);
      setAnimationStep(2);
      const connectionMidX = (backend.x + backend.width + frontend.x) / 2;
      const connectionMidY = backend.y + backend.height / 2;
      currentPos = await animateMouseTo(
        currentPos.x,
        currentPos.y,
        connectionMidX,
        connectionMidY,
        1000
      );
      setHighlightConnection(true);
      await wait(400);

      // Step 4: Move to frontend (1s)
      setHighlightConnection(false);
      setAnimationStep(3);
      currentPos = await animateMouseTo(
        currentPos.x,
        currentPos.y,
        frontend.x + frontend.width / 2,
        frontend.y + frontend.height / 2,
        1000
      );
      setHighlightFrontend(true);

      // Step 5: Show frontend menu (2s)
      setShowFrontendMenu(true);
      await wait(2000);

      // Step 6: Hide menu and move mouse to the right edge (1s)
      setShowFrontendMenu(false);
      setHighlightFrontend(false);
      setAnimationStep(0);
      currentPos = await animateMouseTo(
        currentPos.x,
        currentPos.y,
        620,
        frontend.y + frontend.height / 2,
        500
      );
      await wait(1500);

      // Wait before restarting
      await wait(1000);
    };

    const apiConfigAnimation = async () => {
      // Start from left side
      const startX = 20;
      const startY = backend.y + backend.height / 2;
      setMousePos({ x: startX, y: startY });
      await wait(500);

      // Step 1: Move cursor to backend component (1s)
      let currentPos = await animateMouseTo(
        startX,
        startY,
        backend.x + backend.width / 2,
        backend.y + backend.height / 2,
        1000
      );
      setHighlightBackend(true);
      await wait(300);

      // Step 2: Show API menu directly (2.5s)
      setShowApiMenu(true);
      await wait(2500);

      // Step 3: Hide menu and move away
      setShowApiMenu(false);
      setHighlightBackend(false);
      await animateMouseTo(
        currentPos.x,
        currentPos.y,
        620,
        backend.y + backend.height / 2,
        500
      );
      await wait(1500);

      // Wait before restarting
      await wait(1000);
    };

    const animation =
      type === "api-config" ? apiConfigAnimation : overviewAnimation;

    const loop = async () => {
      while (true) {
        await animation();
      }
    };

    loop();
  }, []);

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const animateMouseTo = (
    startX: number,
    startY: number,
    targetX: number,
    targetY: number,
    duration: number
  ) => {
    return new Promise<{ x: number; y: number }>((resolve) => {
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);

        const currentX = startX + (targetX - startX) * eased;
        const currentY = startY + (targetY - startY) * eased;

        setMousePos({ x: currentX, y: currentY });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve({ x: targetX, y: targetY });
        }
      };

      animate();
    });
  };

  return (
    <div className="relative w-full h-[400px] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
      />

      {/* Connection line */}
      {showConnection && (
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1, width: "100%", height: "100%" }}
        >
          <defs>
            <marker
              id="arrowhead-demo"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3, 0 6"
                fill={highlightConnection ? "#f97316" : "#52525b"}
              />
            </marker>
          </defs>
          <line
            x1={backend.x + backend.width}
            y1={backend.y + backend.height / 2}
            x2={frontend.x}
            y2={frontend.y + frontend.height / 2}
            stroke={highlightConnection ? "#f97316" : "#52525b"}
            strokeWidth={highlightConnection ? "4" : "3"}
            markerEnd="url(#arrowhead-demo)"
            className={highlightConnection ? "animate-pulse" : ""}
          />
        </svg>
      )}

      {/* Backend Component */}
      <div
        className={`absolute bg-zinc-800 border-2 rounded-lg shadow-lg transition-all duration-300 ${
          highlightBackend
            ? "border-orange-500 ring-2 ring-orange-500/50"
            : "border-zinc-700"
        }`}
        style={{
          left: backend.x,
          top: backend.y,
          width: backend.width,
          height: backend.height,
          zIndex: 2,
        }}
      >
        <div className="p-3 h-full flex flex-col">
          <div className="flex items-start gap-2 mb-2">
            <GripVertical
              size={16}
              className="text-zinc-500 flex-shrink-0 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-zinc-100 text-sm truncate">
                API Service
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                  <Database size={10} />
                  Service
                </span>
              </div>
            </div>
          </div>
          <div className="mt-auto flex flex-wrap gap-1">
            <span className="px-2 py-0.5 bg-green-900/40 text-green-400 text-xs rounded border border-green-800">
              Payments
            </span>
            <span className="px-2 py-0.5 bg-green-900/40 text-green-400 text-xs rounded border border-green-800">
              Database
            </span>
            <span className="px-2 py-0.5 bg-green-900/40 text-green-400 text-xs rounded border border-green-800">
              Caching
            </span>
          </div>
        </div>
      </div>

      {/* Frontend Component */}
      <div
        className={`absolute bg-zinc-800 border-2 rounded-lg shadow-lg transition-all duration-300 ${
          highlightFrontend
            ? "border-orange-500 ring-2 ring-orange-500/50"
            : "border-zinc-700"
        }`}
        style={{
          left: frontend.x,
          top: frontend.y,
          width: frontend.width,
          height: frontend.height,
          zIndex: 2,
        }}
      >
        <div className="p-3 h-full flex flex-col">
          <div className="flex items-start gap-2 mb-2">
            <GripVertical
              size={16}
              className="text-zinc-500 flex-shrink-0 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-zinc-100 text-sm truncate">
                Web App
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                  <Monitor size={10} />
                  Web
                </span>
              </div>
            </div>
          </div>
          <div className="mt-auto flex flex-wrap gap-1">
            <span className="px-2 py-0.5 bg-green-900/40 text-green-400 text-xs rounded border border-green-800">
              Authentication
            </span>
            <span className="px-2 py-0.5 bg-green-900/40 text-green-400 text-xs rounded border border-green-800">
              Analytics
            </span>
          </div>
        </div>
      </div>

      {/* Backend Menu */}
      {showBackendMenu && (
        <div
          className="absolute bg-zinc-800 border border-zinc-700 rounded-lg p-3 shadow-xl animate-fade-in"
          style={{
            left: backend.x + backend.width + 20,
            top: backend.y,
            width: 200,
            zIndex: 10,
          }}
        >
          <div className="space-y-2">
            <div className="text-xs font-semibold text-zinc-300 border-b border-zinc-700 pb-2">
              Configure Component
            </div>
            <div>
              <label className="block text-zinc-400 text-xs mb-1">Type</label>
              <div className="flex gap-1">
                <button className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                  Service
                </button>
              </div>
            </div>
            <div className="pt-1 space-y-1">
              <button className="w-full px-2 py-1.5 bg-zinc-700 text-zinc-100 text-xs rounded hover:bg-zinc-600">
                Configure API
              </button>
              <button className="w-full px-2 py-1.5 bg-zinc-700 text-zinc-100 text-xs rounded hover:bg-zinc-600">
                Configure Modules
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Frontend Menu */}
      {showFrontendMenu && (
        <div
          className="absolute bg-zinc-800 border border-zinc-700 rounded-lg p-3 shadow-xl animate-fade-in"
          style={{
            left: frontend.x - 220,
            top: frontend.y,
            width: 200,
            zIndex: 10,
          }}
        >
          <div className="space-y-2">
            <div className="text-xs font-semibold text-zinc-300 border-b border-zinc-700 pb-2">
              Configure Component
            </div>
            <div>
              <label className="block text-zinc-400 text-xs mb-1">Type</label>
              <div className="flex gap-1">
                <button className="flex-1 px-2 py-1 bg-purple-600 text-white text-xs rounded">
                  Web
                </button>
              </div>
            </div>
            <div className="pt-1">
              <button className="w-full px-2 py-1.5 bg-zinc-700 text-zinc-100 text-xs rounded hover:bg-zinc-600">
                Configure Modules
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Definition Menu */}
      {showApiMenu && (
        <div
          className="absolute bg-zinc-800 border border-zinc-700 rounded-lg p-3 shadow-xl animate-fade-in"
          style={{
            left: backend.x + backend.width + 20,
            top: backend.y,
            width: 220,
            maxHeight: 280,
            zIndex: 10,
          }}
        >
          <div className="space-y-2">
            <div className="text-xs font-semibold text-zinc-300 border-b border-zinc-700 pb-2">
              Define API
            </div>

            {/* Sample Endpoint 1 */}
            <div className="p-2 bg-zinc-900 rounded border border-zinc-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 bg-green-600 text-white text-[10px] rounded font-mono">
                  GET
                </span>
                <span className="text-zinc-300 text-xs font-mono">/users</span>
              </div>
              <div className="text-[10px] text-zinc-500">200 OK</div>
            </div>

            {/* Sample Endpoint 2 */}
            <div className="p-2 bg-zinc-900 rounded border border-zinc-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[10px] rounded font-mono">
                  POST
                </span>
                <span className="text-zinc-300 text-xs font-mono">/users</span>
              </div>
              <div className="text-[10px] text-zinc-500">201 Created</div>
            </div>

            {/* Sample Endpoint 3 */}
            <div className="p-2 bg-zinc-900 rounded border border-zinc-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 bg-orange-600 text-white text-[10px] rounded font-mono">
                  PUT
                </span>
                <span className="text-zinc-300 text-xs font-mono">
                  /users/:id
                </span>
              </div>
              <div className="text-[10px] text-zinc-500">200 OK</div>
            </div>
          </div>
        </div>
      )}

      {/* Cursor */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          zIndex: 50,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
            fill="white"
            stroke="black"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}
