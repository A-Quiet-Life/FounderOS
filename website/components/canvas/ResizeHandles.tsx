"use client";

interface ResizeHandlesProps {
  onResizeStart: (
    e: React.MouseEvent,
    corner: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  ) => void;
}

export default function ResizeHandles({ onResizeStart }: ResizeHandlesProps) {
  return (
    <>
      {/* Top-left corner */}
      <div
        onMouseDown={(e) => onResizeStart(e, "top-left")}
        className="absolute -top-1 -left-1 w-3 h-3 cursor-nwse-resize bg-orange-500 hover:bg-orange-400 rounded-full border-2 border-zinc-900"
        style={{ zIndex: 11 }}
      />
      {/* Top-right corner */}
      <div
        onMouseDown={(e) => onResizeStart(e, "top-right")}
        className="absolute -top-1 -right-1 w-3 h-3 cursor-nesw-resize bg-orange-500 hover:bg-orange-400 rounded-full border-2 border-zinc-900"
        style={{ zIndex: 11 }}
      />
      {/* Bottom-left corner */}
      <div
        onMouseDown={(e) => onResizeStart(e, "bottom-left")}
        className="absolute -bottom-1 -left-1 w-3 h-3 cursor-nesw-resize bg-orange-500 hover:bg-orange-400 rounded-full border-2 border-zinc-900"
        style={{ zIndex: 11 }}
      />
      {/* Bottom-right corner */}
      <div
        onMouseDown={(e) => onResizeStart(e, "bottom-right")}
        className="absolute -bottom-1 -right-1 w-3 h-3 cursor-nwse-resize bg-orange-500 hover:bg-orange-400 rounded-full border-2 border-zinc-900"
        style={{ zIndex: 11 }}
      />
    </>
  );
}
