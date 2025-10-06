import { ReactNode } from "react";

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function TerminalWindow({
  children,
  title = "~/founderos",
  className = "",
}: TerminalWindowProps) {
  return (
    <div
      className={`relative animate-slide-in-right delay-200 w-full ${className}`}
    >
      <div className="relative bg-black rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl transition-all duration-300 border border-zinc-800 h-[400px] sm:h-[450px] lg:h-[500px] flex flex-col overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-3xl"></div>

        {/* Terminal Header */}
        <div className="flex items-center space-x-2 mb-3 sm:mb-4 relative flex-shrink-0">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          <span className="text-zinc-500 text-xs ml-2 sm:ml-4 font-mono truncate">
            {title}
          </span>
        </div>

        {/* Terminal Content */}
        <div className="relative font-mono text-sm sm:text-base flex-1 flex flex-col min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
}
