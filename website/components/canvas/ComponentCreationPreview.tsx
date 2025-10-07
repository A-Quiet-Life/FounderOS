"use client";

interface ComponentCreationPreviewProps {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export default function ComponentCreationPreview({
  startX,
  startY,
  currentX,
  currentY,
}: ComponentCreationPreviewProps) {
  return (
    <div
      className="absolute bg-zinc-800/50 border-2 border-dashed border-orange-500 rounded-lg"
      style={{
        left: Math.min(startX, currentX),
        top: Math.min(startY, currentY),
        width: Math.abs(currentX - startX),
        height: Math.abs(currentY - startY),
        zIndex: 1000,
        pointerEvents: "none",
      }}
    />
  );
}
