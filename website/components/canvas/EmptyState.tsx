"use client";

import { Sparkles } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center text-zinc-600">
        <Sparkles className="mx-auto mb-2" size={32} />
        <p className="text-sm">Click "Add Component" to start building</p>
      </div>
    </div>
  );
}
