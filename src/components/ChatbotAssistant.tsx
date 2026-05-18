import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { createServerFn } from "@tanstack/react-start";

type Msg = { role: "user" | "ai"; text: string };

const SEEDS: string[] = [
  "Namaste! I'm Kisawan AI. Ask me about crop disease, hydration tips, weather, or fertilizer guidance.",
];

// This server function executes securely on Vercel's backend, hiding your Gemini API Key
const askGeminiServer = createServerFn({ method: "POST" })
  .validator((message: string) => message)
  .handler(async ({ data: message }) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY environment variable on Vercel.");
      return "Namaste! My AI system is currently undergoing maintenance. Please try again shortly.";
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
          }),
        }
      );

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I analyzed the details but couldn't generate a clear insight right now. Please try rephrasing."
      );
    } catch (error) {
      console.error("Gemini API call failed:", error);
      return "I encountered a minor network glitch while trying to fetch agricultural insights. Please try again.";
    }
  });

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

    // 1. Instantly show the user's typed message in the chat window
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");

    // 2. Temporarily show a loading message so the user knows Kisawan AI is thinking
    setMsgs((m) => [...m, { role: "ai", text: "Analyzing farm query..." }]);

    try {
      // 3. Fire the prompt up to the secure backend server function
      const replyFromGemini = await askGeminiServer({ data: text });

      // 4. Swap out the "Analyzing..." message with Gemini's actual response
      setMsgs((m) => {
        const updated = [...m];
        if (updated.length > 0) {
          updated[updated.length - 1] = { role: "ai", text: replyFromGemini };
        }
        return updated;
      });
    } catch (error) {
      console.error("Error updating chat UI from server function:", error);
      setMsgs((m) => [
        ...m,
        { role: "ai", text: "Something went wrong on our end. Please check your internet connection." },
      ]);
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
              
