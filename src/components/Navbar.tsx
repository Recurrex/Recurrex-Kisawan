import { Link, useLocation } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

type NavLink =
  | { to: "/" | "/features" | "/dashboard" | "/about"; label: string; href?: undefined }
  | { href: string; label: string; to?: undefined };

const links: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
  { href: "mailto:recurrex.ofc@gmail.com", label: "Contact" },
];

export function Navbar() {
  const { pathname } = useLocation();
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-neon glow-green">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Kisawan
            </span>
          </Link>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const key = l.to ?? l.href!;
              const active = l.to && (pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to)));
              const cls = `rounded-full px-4 py-2 text-sm transition-colors ${
                active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"
              }`;
              return (
                <li key={key}>
                  {l.to ? (
                    <Link to={l.to} className={cls}>{l.label}</Link>
                  ) : (
                    <a href={l.href} className={cls}>{l.label}</a>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            to="/dashboard"
            className="hidden rounded-full bg-neon px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 sm:inline-block"
          >
            Launch
          </Link>
        </nav>
      </div>
    </header>
  );
}
