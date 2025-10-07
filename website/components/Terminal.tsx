"use client";

import { useState, useEffect, useRef } from "react";
import TerminalWindow from "./TerminalWindow";

// ============================================================================
// Types
// ============================================================================

interface TerminalLine {
  type: "input" | "output" | "error" | "progress";
  content: string;
  timestamp?: number;
}

interface ProjectConfig {
  name: string;
  format: string;
  backendLanguage: string;
  backendFramework: string;
  frontend: string;
  features: string[];
}

type TerminalState =
  | "idle"
  | "awaiting_format"
  | "awaiting_backend_language"
  | "awaiting_backend_framework"
  | "awaiting_frontend"
  | "awaiting_mobile_framework"
  | "awaiting_features"
  | "processing";

// ============================================================================
// Constants
// ============================================================================

const WELCOME_LINES = [
  { type: "output" as const, content: "" },
  { type: "output" as const, content: "  Welcome to FounderOS ⚡" },
  { type: "output" as const, content: "  The final CLI for builders 🚀" },
  { type: "output" as const, content: "" },
  {
    type: "output" as const,
    content: "  Bootstrap your next project in seconds",
  },
  { type: "output" as const, content: "" },
  { type: "output" as const, content: "  Commands:" },
  {
    type: "output" as const,
    content: "    found <name>    Create a new project",
  },
  { type: "output" as const, content: "" },
];

const LANGUAGE_MAP: Record<string, string> = {
  "1": "TypeScript (Node.js)",
  typescript: "TypeScript (Node.js)",
  ts: "TypeScript (Node.js)",
  "2": "Python",
  python: "Python",
  "3": "Go",
  go: "Go",
  "4": "Rust",
  rust: "Rust",
};

const FRAMEWORK_MAP: Record<string, string[]> = {
  "TypeScript (Node.js)": ["NestJS", "Express.js", "Fastify", "Koa"],
  Python: ["FastAPI", "Django", "Flask", "Tornado"],
  Go: ["Gin", "Echo", "Fiber", "Chi"],
  Rust: ["Actix-web", "Rocket", "Axum", "Warp"],
};

const FRONTEND_OPTIONS = [
  "Next.js",
  "React",
  "Vue",
  "Nuxt",
  "Angular",
  "Svelte",
];
const MOBILE_FRAMEWORKS = ["React Native", "Flutter (Dart)"];

const FEATURES = [
  "Subscriptions (Stripe)",
  "Authentication (Clerk.js)",
  "Caching (Redis)",
  "Persistent (Postgres)",
  "Analytics (Posthog)",
];

const FEATURE_STEPS: Record<string, string> = {
  "Subscriptions (Stripe)": "💳 Configuring Stripe payment integration",
  "Authentication (Clerk.js)": "🔐 Setting up Clerk authentication",
  "Caching (Redis)": "⚡ Configuring Redis caching layer",
  "Persistent (Postgres)": "🗄️  Setting up Postgres database",
  "Analytics (Posthog)": "📊 Integrating Posthog analytics",
};

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const DIVIDER = "════════════════════════════════════════════════════════";

// ============================================================================
// Component
// ============================================================================

export default function Terminal() {
  const [input, setInput] = useState("found a-beautiful-unicorn");
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME_LINES);
  const [terminalState, setTerminalState] = useState<TerminalState>("idle");
  const [projectConfig, setProjectConfig] = useState<Partial<ProjectConfig>>(
    {}
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  // Auto-focus input and scroll to bottom
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [lines]);

  // ============================================================================
  // Helper Functions
  // ============================================================================

  const addLine = (type: TerminalLine["type"], content: string) => {
    setLines((prev) => [...prev, { type, content, timestamp: Date.now() }]);
  };

  const addMultipleLines = (
    newLines: { type: TerminalLine["type"]; content: string }[]
  ) => {
    setLines((prev) => [
      ...prev,
      ...newLines.map((line) => ({ ...line, timestamp: Date.now() })),
    ]);
  };

  const showOptions = (title: string, options: string[]) => {
    addMultipleLines([
      { type: "output", content: title },
      ...options.map((opt, i) => ({
        type: "output" as const,
        content: `  ${i + 1}. ${opt}`,
      })),
      { type: "output", content: "" },
    ]);
  };

  const showBackendLanguages = () => {
    showOptions(
      "⚙️  Select your backend language:",
      Object.values(LANGUAGE_MAP).filter((_, i) => i % 3 === 0)
    );
  };

  const showFeaturesPrompt = () => {
    addMultipleLines([
      {
        type: "output",
        content: "✨ Select additional features (comma-separated numbers):",
      },
      ...FEATURES.map((f, i) => ({
        type: "output" as const,
        content: `  ${i + 1}. ${f}`,
      })),
      { type: "output", content: "  (or press enter to skip)" },
      { type: "output", content: "" },
    ]);
  };

  const showSuccessMessage = (projectName: string) => {
    addMultipleLines([
      { type: "output", content: "" },
      { type: "output", content: DIVIDER },
      {
        type: "output",
        content: "  🚀 You've just created the next big thing!",
      },
      { type: "output", content: DIVIDER },
      { type: "output", content: "" },
      {
        type: "output",
        content: `  Your project "${projectName}" is ready to change the world.`,
      },
      { type: "output", content: "" },
      {
        type: "output",
        content: "  From idea to reality in seconds. Now go build something",
      },
      { type: "output", content: "  amazing. 🎉" },
      { type: "output", content: "" },
    ]);
    setTerminalState("idle");
  };

  const animateProgressBar = (step: string, onComplete: () => void) => {
    let frameIndex = 0;
    const maxFrames = 15; // Show spinner for ~15 frames

    const animate = () => {
      if (frameIndex < maxFrames) {
        setLines((prev) => {
          const newLines = [...prev];
          const spinnerChar =
            SPINNER_FRAMES[frameIndex % SPINNER_FRAMES.length];
          const content = `${spinnerChar} ${step}`;

          if (frameIndex === 0) {
            newLines.push({ type: "progress", content, timestamp: Date.now() });
          } else {
            newLines[newLines.length - 1] = {
              type: "progress",
              content,
              timestamp: Date.now(),
            };
          }
          return newLines;
        });
        frameIndex++;
        setTimeout(animate, 80);
      } else {
        // Show checkmark when done
        setLines((prev) => {
          const newLines = [...prev];
          newLines[newLines.length - 1] = {
            type: "progress",
            content: `✓ ${step}`,
            timestamp: Date.now(),
          };
          return newLines;
        });
        setTimeout(onComplete, 100);
      }
    };

    animate();
  };

  // ============================================================================
  // Command Handlers
  // ============================================================================

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    const command = input.trim().toLowerCase();
    if (!command) return;

    addLine("input", `$ ${input}`);
    setInput("");

    const handlers: Record<TerminalState, (cmd: string) => void> = {
      idle: handleIdleCommand,
      awaiting_format: handleFormatSelection,
      awaiting_backend_language: handleBackendLanguageSelection,
      awaiting_backend_framework: handleBackendFrameworkSelection,
      awaiting_frontend: handleFrontendSelection,
      awaiting_mobile_framework: handleMobileFrameworkSelection,
      awaiting_features: handleFeaturesSelection,
      processing: () => {},
    };

    handlers[terminalState](command);
  };

  const handleIdleCommand = (command: string) => {
    const [cmd, ...args] = command.split(/\s+/);

    if (cmd === "found") {
      if (args.length === 0) {
        addLine("error", "❌ Error: project name is required");
        addLine("output", "   Usage: found <project-name>");
      } else {
        setProjectConfig({ name: args.join("-") });
        addMultipleLines([
          { type: "output", content: "" },
          {
            type: "output",
            content: "🎯 What type of project would you like to create?",
          },
          { type: "output", content: "  1. fullstack web" },
          { type: "output", content: "  2. mobile" },
          { type: "output", content: "  3. microservice" },
          { type: "output", content: "" },
        ]);
        setTerminalState("awaiting_format");
      }
    } else if (cmd === "clear") {
      setLines([]);
    } else {
      addLine("error", `Command not found: ${cmd}`);
      addLine("output", "Type 'found <name>' to create a project");
    }
  };

  const handleFormatSelection = (command: string) => {
    if (
      command === "1" ||
      command === "fullstack web" ||
      command === "fullstack"
    ) {
      setProjectConfig((prev) => ({ ...prev, format: "fullstack web" }));
      showBackendLanguages();
      setTerminalState("awaiting_backend_language");
    } else if (command === "2" || command === "mobile") {
      setProjectConfig((prev) => ({ ...prev, format: "mobile" }));
      showOptions("📱 Select your mobile framework:", MOBILE_FRAMEWORKS);
      setTerminalState("awaiting_mobile_framework");
    } else if (command === "3" || command === "microservice") {
      setProjectConfig((prev) => ({ ...prev, format: "microservice" }));
      showBackendLanguages();
      setTerminalState("awaiting_backend_language");
    } else {
      addLine("error", "Invalid selection. Type 1-3");
    }
  };

  const handleBackendLanguageSelection = (command: string) => {
    const language = LANGUAGE_MAP[command];

    if (language) {
      setProjectConfig((prev) => ({ ...prev, backendLanguage: language }));
      const frameworks = FRAMEWORK_MAP[language];
      showOptions("🔧 Select your backend framework:", frameworks);
      setTerminalState("awaiting_backend_framework");
    } else {
      addLine("error", "Invalid selection. Type 1-4 or language name");
    }
  };

  const handleBackendFrameworkSelection = (command: string) => {
    const frameworks = FRAMEWORK_MAP[projectConfig.backendLanguage || ""];
    const index = parseInt(command) - 1;

    if (frameworks && index >= 0 && index < frameworks.length) {
      setProjectConfig((prev) => ({
        ...prev,
        backendFramework: frameworks[index],
      }));

      if (projectConfig.format === "microservice") {
        showFeaturesPrompt();
        setTerminalState("awaiting_features");
      } else {
        showOptions("🎨 Select your frontend technology:", FRONTEND_OPTIONS);
        setTerminalState("awaiting_frontend");
      }
    } else {
      addLine("error", "Invalid selection. Type 1-4");
    }
  };

  const handleFrontendSelection = (command: string) => {
    const index = parseInt(command) - 1;

    if (index >= 0 && index < FRONTEND_OPTIONS.length) {
      setProjectConfig((prev) => ({
        ...prev,
        frontend: FRONTEND_OPTIONS[index],
      }));
      showFeaturesPrompt();
      setTerminalState("awaiting_features");
    } else {
      addLine("error", "Invalid selection. Type 1-6");
    }
  };

  const handleMobileFrameworkSelection = (command: string) => {
    const index = parseInt(command) - 1;

    if (index >= 0 && index < MOBILE_FRAMEWORKS.length) {
      setProjectConfig((prev) => ({
        ...prev,
        frontend: MOBILE_FRAMEWORKS[index],
      }));
      setTerminalState("processing");

      setTimeout(() => {
        addMultipleLines([
          { type: "output", content: DIVIDER },
          { type: "output", content: "  Configuration Summary" },
          { type: "output", content: DIVIDER },
          { type: "output", content: "" },
          {
            type: "output",
            content: `  Project Name: ${projectConfig.name || "my-project"}`,
          },
          { type: "output", content: "  Project Type: mobile" },
          {
            type: "output",
            content: `  Framework: ${MOBILE_FRAMEWORKS[index]}`,
          },
          { type: "output", content: "" },
          { type: "output", content: DIVIDER },
          { type: "output", content: "" },
          { type: "output", content: "🚀 Initializing your project..." },
          { type: "output", content: "" },
        ]);

        const steps = [
          "📦 Creating project structure",
          "⚙️  Installing dependencies",
          "🎨 Setting up mobile configuration",
          "✅ Project initialization complete",
        ];

        let stepIndex = 0;
        const executeStep = () => {
          if (stepIndex >= steps.length) {
            setTimeout(
              () => showSuccessMessage(projectConfig.name || "my-project"),
              250
            );
            return;
          }

          animateProgressBar(steps[stepIndex], () => {
            stepIndex++;
            setTimeout(executeStep, 100);
          });
        };

        setTimeout(executeStep, 300);
      }, 200);
    } else {
      addLine("error", "Invalid selection. Type 1-2");
    }
  };

  const handleFeaturesSelection = (command: string) => {
    const selectedFeatures: string[] = [];

    if (command.trim()) {
      command.split(",").forEach((s) => {
        const index = parseInt(s.trim()) - 1;
        if (index >= 0 && index < FEATURES.length) {
          selectedFeatures.push(FEATURES[index]);
        }
      });
    }

    setProjectConfig((prev) => ({ ...prev, features: selectedFeatures }));
    setTerminalState("processing");

    setTimeout(() => {
      // Show summary
      const summaryLines = [
        { type: "output" as const, content: DIVIDER },
        { type: "output" as const, content: "  Configuration Summary" },
        { type: "output" as const, content: DIVIDER },
        { type: "output" as const, content: "" },
        {
          type: "output" as const,
          content: `  Project Name: ${projectConfig.name || "my-project"}`,
        },
        {
          type: "output" as const,
          content: `  Project Type: ${projectConfig.format || "project"}`,
        },
        {
          type: "output" as const,
          content: `  Backend: ${
            projectConfig.backendLanguage || "backend"
          } + ${projectConfig.backendFramework || "framework"}`,
        },
      ];

      if (projectConfig.format === "fullstack web") {
        summaryLines.push({
          type: "output" as const,
          content: `  Frontend: ${projectConfig.frontend || "frontend"}`,
        });
      }

      summaryLines.push(
        {
          type: "output" as const,
          content: `  Features: ${
            selectedFeatures.length > 0 ? selectedFeatures.join(", ") : "None"
          }`,
        },
        { type: "output" as const, content: "" },
        { type: "output" as const, content: DIVIDER },
        { type: "output" as const, content: "" },
        { type: "output" as const, content: "🚀 Initializing your project..." },
        { type: "output" as const, content: "" }
      );

      addMultipleLines(summaryLines);

      // Build progress steps
      const progressSteps = [
        "📦 Setting up project structure",
        `⚙️  Configuring backend (${
          projectConfig.backendFramework || "backend"
        })`,
      ];

      if (projectConfig.format === "fullstack web") {
        progressSteps.push(
          `🎨 Setting up frontend (${projectConfig.frontend || "frontend"})`
        );
      }

      progressSteps.push("🔧 Installing dependencies");
      selectedFeatures.forEach((feature) => {
        if (FEATURE_STEPS[feature]) {
          progressSteps.push(FEATURE_STEPS[feature]);
        }
      });
      progressSteps.push("📝 Generating boilerplate", "✨ Finalizing setup");

      // Animate progress
      let stepIndex = 0;
      const executeStep = () => {
        if (stepIndex >= progressSteps.length) {
          setTimeout(
            () => showSuccessMessage(projectConfig.name || "my-project"),
            250
          );
          return;
        }

        animateProgressBar(progressSteps[stepIndex], () => {
          stepIndex++;
          setTimeout(executeStep, 100);
        });
      };

      setTimeout(executeStep, 300);
    }, 200);
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <TerminalWindow>
      <div className="flex flex-col h-full">
        <div
          ref={historyRef}
          className="flex-1 overflow-y-auto overflow-x-hidden space-y-0.5 sm:space-y-1 mb-3 sm:mb-4 min-h-0"
        >
          {lines.map((line, index) => (
            <div key={index} className="flex items-start">
              <span
                className={`font-mono text-xs sm:text-sm break-all ${
                  line.type === "input"
                    ? "text-zinc-300"
                    : line.type === "error"
                    ? "text-red-400"
                    : line.type === "progress"
                    ? "text-yellow-400"
                    : "text-zinc-400"
                }`}
              >
                {line.content}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center border-t border-zinc-800 pt-2 sm:pt-3 flex-shrink-0">
          <span className="text-orange-500 mr-1 sm:mr-2 font-mono text-xs sm:text-sm flex-shrink-0">
            founder &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) =>
              e.target.value.length <= 24 && setInput(e.target.value)
            }
            onKeyDown={handleKeyPress}
            disabled={terminalState === "processing"}
            className="bg-transparent border-none outline-none text-zinc-300 font-mono text-xs sm:text-sm flex-1 disabled:opacity-50 min-w-0 caret-orange-500 animate-blink-caret"
            placeholder="Type a command..."
            maxLength={24}
          />
        </div>
      </div>
    </TerminalWindow>
  );
}
