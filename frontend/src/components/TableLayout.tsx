import type { ReactNode } from "react";

interface TableLayoutProps {
  title: string;
  icon: ReactNode;
  subtitle: string;
  children: ReactNode;
}

export default function TableLayout({
  title,
  icon,
  subtitle,
  children,
}: TableLayoutProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-blue-500/20 rounded-full">{icon}</div>
        </div>
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
      </div>
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
        {children}
      </div>
    </div>
  );
}
