import { ReactNode } from "react";

interface BenefitCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export default function BenefitCard({
  title,
  description,
  icon,
  className = "",
}: BenefitCardProps) {
  return (
    <div
      className={`group relative glass-effect rounded-2xl p-6 border-2 border-zinc-800 hover:border-orange-500 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="flex flex-col h-full">
        <div className="text-orange-500 mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-orange-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute -inset-px bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
