import { CloudRain, Droplets, FlaskConical, Leaf, Sprout, Sun, Upload, Wind } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatCard } from "./Widgets";

const yieldData = [
  { m: "Apr", actual: 1.2, predicted: 1.3 },
  { m: "May", actual: 1.6, predicted: 1.5 },
  { m: "Jun", actual: 2.1, predicted: 2.0 },
  { m: "Jul", actual: 2.4, predicted: 2.6 },
  { m: "Aug", actual: 2.9, predicted: 3.1 },
  { m: "Sep", actual: 3.3, predicted: 3.4 },
];

const soilData = [
  { n: "N", v: 62 }, { n: "P", v: 48 }, { n: "K", v: 71 },
  { n: "pH", v: 68 }, { n: "OM", v: 55 },
];

export function CropHealth() {
  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Sun className="h-5 w-5" />} label="Weather" value="32°C" hint="Partly cloudy" accent="blue" />
        <StatCard icon={<Droplets className="h-5 w-5" />} label="Soil moisture" value="46" unit="%" hint="Optimal 40-60%" accent="teal" />
        <StatCard icon={<Sprout className="h-5 w-5" />} label="Crop vigor" value="88" unit="/100" hint="Healthy" accent="green" />
        <StatCard icon={<Wind className="h-5 w-5" />} label="Wind" value="12" unit="km/h" hint="Spray-safe" accent="blue" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Disease upload */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-neon"><Leaf className="h-4 w-4 text-primary-foreground" /></div>
            <div>
              <h3 className="font-display text-lg">Disease Scan</h3>
              <p className="text-xs text-muted-foreground">Upload a leaf photo</p>
            </div>
          </div>
          <label className="grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-white/15 bg-white/5 py-10 text-center transition-colors hover:border-primary/60">
            <Upload className="mb-2 h-7 w-7 text-primary" />
            <p className="text-sm font-medium">Drop image or click to upload</p>
            <p className="text-xs text-muted-foreground">JPG, PNG · max 10MB</p>
            <input type="file" accept="image/*" className="hidden" />
          </label>
          <div className="mt-4 rounded-xl bg-white/5 p-3 text-sm">
            <p className="text-primary">Last scan: <span className="text-foreground">Tomato — healthy</span></p>
            <p className="mt-1 text-xs text-muted-foreground">Confidence 96% · 2 hr ago</p>
          </div>
        </div>

        {/* Weather */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-cool"><CloudRain className="h-4 w-4 text-primary-foreground" /></div>
            <div>
              <h3 className="font-display text-lg">Weather Analysis</h3>
              <p className="text-xs text-muted-foreground">Next 5 days</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { d: "Today", t: "32° / 24°", w: "Sunny" },
              { d: "Tue", t: "31° / 23°", w: "Cloudy" },
              { d: "Wed", t: "29° / 22°", w: "Showers" },
              { d: "Thu", t: "27° / 21°", w: "Rain" },
              { d: "Fri", t: "30° / 22°", w: "Clear" },
            ].map((r) => (
              <div key={r.d} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm">
                <span className="w-14 text-muted-foreground">{r.d}</span>
                <span>{r.w}</span>
                <span className="font-display">{r.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Soil */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-neon"><FlaskConical className="h-4 w-4 text-primary-foreground" /></div>
            <div>
              <h3 className="font-display text-lg">Soil Health</h3>
              <p className="text-xs text-muted-foreground">Nutrient profile</p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={soilData}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="n" stroke="oklch(0.72 0.03 220)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.72 0.03 220)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.19 0.03 230)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Bar dataKey="v" fill="oklch(0.85 0.22 150)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Analytics chart + recommendations */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg">Yield analytics</h3>
              <p className="text-xs text-muted-foreground">Tons / acre — actual vs AI prediction</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yieldData}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="m" stroke="oklch(0.72 0.03 220)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.72 0.03 220)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.19 0.03 230)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="actual" stroke="oklch(0.85 0.22 150)" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="predicted" stroke="oklch(0.72 0.18 240)" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <h4 className="mb-2 flex items-center gap-2 font-display"><Droplets className="h-4 w-4 text-secondary" /> Irrigation</h4>
            <p className="text-sm text-muted-foreground">Skip irrigation tomorrow — 14mm rain expected by 6am.</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <h4 className="mb-2 flex items-center gap-2 font-display"><FlaskConical className="h-4 w-4 text-primary" /> Fertilizer</h4>
            <p className="text-sm text-muted-foreground">Apply 12kg/acre urea this week; DAP split-dose in 10 days.</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <h4 className="mb-2 flex items-center gap-2 font-display"><Sprout className="h-4 w-4 text-accent" /> AI Insight</h4>
            <p className="text-sm text-muted-foreground">Field B-2 NDVI dropped 6% — inspect for early blight.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
