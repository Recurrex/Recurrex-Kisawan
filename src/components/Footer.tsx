import { Link } from "@tanstack/react-router";
import { Leaf, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-white/5 bg-black/20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-neon">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-semibold">Kisawan</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Protecting both the farmer and the farm with intelligent AI.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/features" className="hover:text-foreground">Features</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Follow</h4>
          <div className="flex gap-3 text-muted-foreground">
            <a href="#" className="hover:text-primary"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary"><Github className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kisawan — Cultivating wellbeing with AI.
      </div>
    </footer>
  );
}
