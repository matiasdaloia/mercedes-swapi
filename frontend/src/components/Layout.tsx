import { Outlet, Link, useLocation } from "react-router";
import { Rocket, Globe, Users, Home } from "lucide-react";
import { useCallback } from "react";

interface NavigationLink {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationLinks: NavigationLink[] = [
  { path: "/", label: "Home", icon: Home },
  { path: "/planets", label: "Planets", icon: Globe },
  { path: "/people", label: "People", icon: Users },
];

export default function Layout() {
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => {
      return (
        (path === "/" && location.pathname === "/") ||
        (path !== "/" && location.pathname.startsWith(path))
      );
    },
    [location.pathname]
  );

  const getLinkClasses = useCallback(
    (path: string) => {
      const baseClasses =
        "flex items-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200";
      const activeClasses =
        "bg-yellow-400/20 text-yellow-400 border border-yellow-400/30";
      const inactiveClasses =
        "text-slate-400 hover:text-slate-300 hover:bg-slate-700/30";

      return `${baseClasses} ${
        isActive(path) ? activeClasses : inactiveClasses
      }`;
    },
    [isActive]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <Rocket className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl font-bold text-white">
                  Galaxy Explorer
                </h1>
              </div>
            </Link>
            <nav>
              <div className="flex space-x-2 py-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={getLinkClasses(link.path)}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-slate-800/30 backdrop-blur-sm border-t border-slate-700/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-400">
            <p>Data sourced from the Star Wars API (SWAPI)</p>
            <p className="mt-2 text-sm">Made with ❤️ by Matias Daloia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
