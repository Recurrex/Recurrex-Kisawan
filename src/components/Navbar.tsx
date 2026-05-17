import { Link, useLocation } from "@tanstack/react-router";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto mt-3 max-w-6xl px-3 sm:mt-4 sm:px-4">
        <nav className="glass flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 sm:px-5 sm:py-3">
          <Link to="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-neon glow-green">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="truncate font-display text-base font-semibold tracking-tight sm:text-lg">
              Kisawan
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const key = l.to ?? l.href!;
              const active = l.to && (pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to)));
              const cls = `rounded-full px-3 py-2 text-sm transition-colors lg:px-4 ${
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

          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="hidden rounded-full bg-neon px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 md:inline-block"
            >
              Launch
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-foreground hover:bg-white/10 md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass-solid mt-2 overflow-hidden rounded-2xl p-2 md:hidden animate-fade-up">
            <ul className="flex flex-col">
              {links.map((l) => {
                const key = l.to ?? l.href!;
                const active = l.to && (pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to)));
                const cls = `block rounded-xl px-4 py-3 text-sm transition-colors ${
                  active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`;
                return (
                  <li key={key}>
                    {l.to ? (
                      <Link to={l.to} className={cls} onClick={() => setOpen(false)}>{l.label}</Link>
                    ) : (
                      <a href={l.href} className={cls} onClick={() => setOpen(false)}>{l.label}</a>
                    )}
                  </li>
                );
              })}
              <li className="p-2">
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl bg-neon px-4 py-3 text-center text-sm font-medium text-primary-foreground"
                >
                  Launch Dashboard
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
