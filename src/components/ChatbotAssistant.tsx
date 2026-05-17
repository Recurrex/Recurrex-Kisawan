import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

const SEEDS: string[] = [
  "Namaste! I'm Kisawan AI. Ask me about crop disease, hydration tips, weather, or fertilizer guidance.",
];

function aiReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("water") || q.includes("hydrat"))
    return "Aim for ~3.5L water today — heat index is high. I'll ping you every 90 min.";
  if (q.includes("disease") || q.includes("leaf"))
    return "Upload a leaf photo in Crop Health → Disease Scan. I'll detect blight, rust, or mildew in seconds.";
  if (q.includes("weather") || q.includes("rain"))
    return "Light showers expected Thursday. Delay spraying till Friday morning for best results.";
  if (q.includes("fertil"))
    return "Soil N is low. Recommend 12kg/acre urea split-dose this week, then DAP in 10 days.";
  return "Got it. I'll analyze your farm telemetry and surface insights on the dashboard shortly.";
}

export function ChatbotAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>(SEEDS.map((t) => ({ role: "ai", text: t })));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [msgs, open]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { role: "ai", text: aiReply(text) }]), 500);
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Kisawan AI"
        className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-neon glow-green animate-pulse-glow transition-transform hover:scale-110 sm:bottom-6 sm:right-6"
      >
        {open ? <X className="h-6 w-6 text-primary-foreground" /> : <Bot className="h-6 w-6 text-primary-foreground" />}
      </button>

      {open && (
        <div className="fixed inset-x-3 bottom-24 z-[55] sm:inset-x-auto sm:right-6 sm:w-[380px] animate-fade-up">
          <div className="glass-solid flex h-[min(70vh,520px)] flex-col overflow-hidden rounded-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cool">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">Kisawan AI</p>
                <p className="truncate text-xs text-muted-foreground">Online · Farming + Health</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] break-words rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-neon text-primary-foreground"
                        : "border border-white/10 bg-white/[0.07] text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="sticky bottom-0 flex items-center gap-2 border-t border-white/10 bg-background/40 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Kisawan AI…"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-neon text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
