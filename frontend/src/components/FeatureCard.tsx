import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  mainIcon: ReactNode;
  pathLabel: string;
}

export default function FeatureCard({
  title,
  subtitle,
  description,
  mainIcon,
  pathLabel,
}: FeatureCardProps) {
  return (
    <div className="group bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 hover:bg-slate-700/40 hover:border-yellow-400/30 transition-all duration-300 hover:scale-105 h-full">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
          {mainIcon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
            {title}
          </h2>
          <p className="text-slate-400">{subtitle}</p>
        </div>
      </div>
      <p className="text-slate-300 mb-6 leading-relaxed">{description}</p>
      <div className="flex items-center text-yellow-400 group-hover:text-yellow-300 transition-colors">
        <span className="font-medium">{pathLabel}</span>
        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
