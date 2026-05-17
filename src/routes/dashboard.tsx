import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HeartPulse, Sprout } from "lucide-react";
import { PersonalHealth } from "@/components/dashboard/PersonalHealth";
import { CropHealth } from "@/components/dashboard/CropHealth";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — Kisawan" },
      { name: "description", content: "AI dashboards for farmer health and crop intelligence." },
    ],
  }),
});

function Dashboard() {
  const [tab, setTab] = useState<"health" | "crop">("health");
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Dashboard</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">
            {tab === "health" ? "Personal Health" : "Crop Health"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {tab === "health"
              ? "Real-time wellbeing telemetry, tailored for the field."
              : "Agronomic intelligence across weather, soil, and crops."}
          </p>
        </div>

        <div className="glass inline-flex rounded-full p-1">
          <button
            onClick={() => setTab("health")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
              tab === "health" ? "bg-neon text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <HeartPulse className="h-4 w-4" /> Personal
          </button>
          <button
            onClick={() => setTab("crop")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
              tab === "crop" ? "bg-cool text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sprout className="h-4 w-4" /> Crop
          </button>
        </div>
      </div>

      <div className="animate-fade-up">
        {tab === "health" ? <PersonalHealth /> : <CropHealth />}
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        Looking for landing? <Link to="/" className="text-primary hover:underline">Back to home</Link>
      </p>
    </div>
  );
}
