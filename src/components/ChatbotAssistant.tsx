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
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-neon glow-green animate-pulse-glow transition-transform hover:scale-110"
      >
        {open ? <X className="h-6 w-6 text-primary-foreground" /> : <Bot className="h-6 w-6 text-primary-foreground" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-2rem))] animate-fade-up">
          <div className="glass flex h-[520px] flex-col overflow-hidden rounded-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-cool">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">Kisawan AI</p>
                <p className="text-xs text-muted-foreground">Online · Farming + Health</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-neon text-primary-foreground"
                        : "bg-white/5 text-foreground"
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
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Kisawan AI…"
                className="flex-1 rounded-full bg-white/5 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="grid h-9 w-9 place-items-center rounded-full bg-neon text-primary-foreground transition-transform hover:scale-105"
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
