"use client";

import { Github, Star } from "lucide-react";
import Link from "next/link";

interface GitHubLinkProps {
  className?: string;
  variant?: "default" | "button";
}

export default function GitHubLink({
  className = "",
  variant = "default",
}: GitHubLinkProps) {
  const baseClasses =
    "flex items-center space-x-2 text-zinc-400 hover:text-zinc-100 transition-colors";
  const buttonClasses =
    "bg-zinc-800 text-zinc-100 px-4 py-2 rounded-lg border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-700 transition-all";

  const classes = variant === "button" ? buttonClasses : baseClasses;

  return (
    <Link
      href="https://github.com/A-Quiet-Life/FounderOS"
      target="_blank"
      rel="noopener noreferrer"
      className={`${classes} ${className}`}
    >
      <Github size={18} />
      <span className="text-sm">GitHub</span>
    </Link>
  );
}
