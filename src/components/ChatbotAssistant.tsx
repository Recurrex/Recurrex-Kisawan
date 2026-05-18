import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

const SEEDS: string[] = [
  "Namaste! I'm Kisawan AI. Ask me about crop disease, hydration tips, weather, or fertilizer guidance.",
];

export function ChatbotAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>(SEEDS.map((t) => ({ role: "ai", text: t })));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [msgs, open]);

  async function send() {
    const text = input.trim();
    if (!text) return;

    // 1. Immediately show user message
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");

    // 2. Show thinking state
    setMsgs((m) => [...m, { role: "ai", text: "Analyzing query..." }]);

    try {
      // Your specific custom prompt instructions integrated exactly as requested
      const systemPrompt = 
        "Your name is strictly Kisawan AI. You must never mention Gemini, ChatGPT, Google, OpenAI, or any other AI architecture or company. If asked who created you, say you are Kisawan AI. " +
        "CRITICAL RULE: You are strictly allowed to answer queries related to farming, crop issues, soil health, fertilizers, weather planning, agriculture, and human physical health/hydration monitoring. " +
        "If the user asks about ANY off-topic subject (such as coding, history, politics, general trivia, entertainment, etc.), you must politely decline to answer, stating that you can only assist with health or crop-related farming issues.";

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        console.error("VITE_GEMINI_API_KEY missing in Lovable settings.");
        setMsgs((m) => {
          const updated = [...m];
          if (updated.length > 0) {
            updated[updated.length - 1] = { role: "ai", text: "AI core configuration missing. Please add VITE_GEMINI_API_KEY in Lovable." };
          }
          return updated;
        });
        return;
      }

      // Hit the AI endpoint inside the Lovable build container
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${systemPrompt}\n\nUser Query: ${text}` }]
              }
            ],
            generationConfig: {
              temperature: 0.2 // Lower temperature keeps it strictly focused on rules
            }
          }),
        }
      );

      const data = await response.json();
      const replyFromGemini = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process your request right now. Please rephrase.";

      // 3. Update the chat window with the guarded reply
      setMsgs((m) => {
        const updated = [...m];
        if (updated.length > 0) {
          updated[updated.length - 1] = { role: "ai", text: replyFromGemini };
        }
        return updated;
      });
    } catch (error) {
      console.error("Connection error:", error);
      setMsgs((m) => {
        const updated = [...m];
        if (updated.length > 0) {
          updated[updated.length - 1] = { role: "ai", text: "Network connection dropped. Try again soon." };
        }
        return updated;
      });
    }
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
              <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] break-words rounded-2xl px-3 py-2 text-sm leading-relaxed ${m.role === "user" ? "bg-neon text-primary-foreground" : "border border-white/10 bg-white/[0.07] text-foreground"}`}>
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
