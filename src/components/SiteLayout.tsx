import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatbotAssistant } from "./ChatbotAssistant";

export function SiteLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-28">{children ?? <Outlet />}</main>
      <Footer />
      <ChatbotAssistant />
    </div>
  );
}
