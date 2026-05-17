import { Activity, Brain, Droplets, Heart, Moon, Sun, Thermometer, User } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GaugeRing, StatCard } from "./Widgets";

const sleepData = [
  { d: "Mon", h: 6.5 }, { d: "Tue", h: 7.1 }, { d: "Wed", h: 5.9 },
  { d: "Thu", h: 7.4 }, { d: "Fri", h: 6.8 }, { d: "Sat", h: 7.9 }, { d: "Sun", h: 7.2 },
];

export function PersonalHealth({
  displayName = "Farmer",
  age,
}: { displayName?: string; age?: number | null } = {}) {
  return (
    <div className="space-y-6">
      {/* Profile + gauges */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-2xl p-6 lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-neon text-primary-foreground">
              <User className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Farmer</p>
              <p className="truncate font-display text-lg font-semibold">{displayName}</p>
              <p className="text-xs text-muted-foreground">{age ? `Age ${age} · ` : ""}Personal wellness</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-xs text-muted-foreground">Heart</p>
              <p className="font-display text-lg">72 <span className="text-xs text-muted-foreground">bpm</span></p>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-xs text-muted-foreground">SpO₂</p>
              <p className="font-display text-lg">98<span className="text-xs text-muted-foreground">%</span></p>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-xs text-muted-foreground">Steps</p>
              <p className="font-display text-lg">8.4k</p>
            </div>
          </div>
        </div>

        <div className="glass grid grid-cols-3 items-center gap-2 rounded-2xl p-4 sm:gap-4 sm:p-6 lg:col-span-2">
          <GaugeRing value={68} label="Hydration" sub="2.4L / 3.5L" color="oklch(0.78 0.16 195)" />
          <GaugeRing value={42} label="Fatigue" sub="Moderate" color="oklch(0.85 0.22 150)" />
          <GaugeRing value={73} label="Sleep" sub="7.2h" color="oklch(0.72 0.18 240)" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Droplets className="h-5 w-5" />} label="Water today" value="2.4" unit="L" hint="Goal 3.5L" accent="teal" />
        <StatCard icon={<Activity className="h-5 w-5" />} label="Fatigue score" value={42} unit="/100" hint="Moderate" accent="green" />
        <StatCard icon={<Moon className="h-5 w-5" />} label="Sleep" value="7.2" unit="hrs" hint="+0.4 vs avg" accent="blue" />
        <StatCard icon={<Thermometer className="h-5 w-5" />} label="Heat exposure" value="High" hint="38°C · UV 9" accent="green" />
      </div>

      {/* Charts + AI */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg">Sleep · last 7 days</h3>
              <p className="text-xs text-muted-foreground">Hours slept per night</p>
            </div>
            <Moon className="h-5 w-5 text-accent" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sleepData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.18 240)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.72 0.18 240)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="d" stroke="oklch(0.72 0.03 220)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.72 0.03 220)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.19 0.03 230)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, color: "oklch(0.97 0.01 200)" }} />
                <Area type="monotone" dataKey="h" stroke="oklch(0.72 0.18 240)" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-neon">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-lg">AI Recommendations</h3>
              <p className="text-xs text-muted-foreground">Personalized for today</p>
            </div>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="rounded-xl bg-white/5 p-3">
              <div className="flex items-center gap-2 text-primary">
                <Droplets className="h-4 w-4" /> <span className="font-medium">Hydrate now</span>
              </div>
              <p className="mt-1 text-muted-foreground">You're 1.1L short. Drink 500ml in the next 30 min.</p>
            </li>
            <li className="rounded-xl bg-white/5 p-3">
              <div className="flex items-center gap-2 text-secondary">
                <Sun className="h-4 w-4" /> <span className="font-medium">Avoid mid-day sun</span>
              </div>
              <p className="mt-1 text-muted-foreground">UV index 9 between 12–3pm. Take shade breaks.</p>
            </li>
            <li className="rounded-xl bg-white/5 p-3">
              <div className="flex items-center gap-2 text-accent">
                <Heart className="h-4 w-4" /> <span className="font-medium">Light stretching</span>
              </div>
              <p className="mt-1 text-muted-foreground">10 min cooldown helps recovery after harvest.</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Wellness insights */}
      <div className="glass rounded-2xl p-6">
        <h3 className="mb-4 font-display text-lg">Daily wellness insights</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Energy", v: "Steady morning · slight dip 2pm", c: "text-primary" },
            { t: "Mood", v: "Positive · 7.5/10", c: "text-secondary" },
            { t: "Recovery", v: "Good · keep sleep ≥ 7h", c: "text-accent" },
          ].map((i) => (
            <div key={i.t} className="rounded-xl bg-white/5 p-4">
              <p className={`text-xs uppercase tracking-wider ${i.c}`}>{i.t}</p>
              <p className="mt-1 text-sm">{i.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
