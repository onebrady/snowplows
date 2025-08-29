import { useMemo, useState } from "react";
import { emitAnalytics } from "../../lib/analytics";

export function SaltUsageCalculator() {
  const [rate, setRate] = useState(300);
  const [laneMiles, setLaneMiles] = useState(50);
  const [storms, setStorms] = useState(3);

  const monthlyLbs = useMemo(
    () => rate * laneMiles * storms,
    [rate, laneMiles, storms]
  );
  const monthlyTons = useMemo(
    () => (monthlyLbs / 2000).toFixed(1),
    [monthlyLbs]
  );
  const seasonTons = useMemo(
    () => ((monthlyLbs * 4) / 2000).toFixed(1),
    [monthlyLbs]
  );

  return (
    <div className="rounded-lg border-2 border-border p-4 bg-muted">
      <h4 className="font-semibold mb-3 text-foreground">Salt Usage Quick-Check</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="text-sm">
          Application rate (lbs/lane-mi)
          <select
            className="mt-1 w-full rounded-md border border-border px-2 py-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={rate}
            onChange={(e) => {
              const v = Number(e.target.value);
              setRate(v);
              emitAnalytics("tool_input", {
                tool: "salt_usage",
                param: "rate",
                value: v,
              });
            }}
          >
            {[200, 250, 300, 350, 400].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Lane-miles
          <input
            className="mt-1 w-full rounded-md border border-border px-2 py-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            type="number"
            min={0}
            value={laneMiles}
            onChange={(e) => {
              const v = Number(e.target.value);
              setLaneMiles(v);
              emitAnalytics("tool_input", {
                tool: "salt_usage",
                param: "laneMiles",
                value: v,
              });
            }}
          />
        </label>
        <label className="text-sm">
          Storms/month
          <select
            className="mt-1 w-full rounded-md border border-border px-2 py-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={storms}
            onChange={(e) => {
              const v = Number(e.target.value);
              setStorms(v);
              emitAnalytics("tool_input", {
                tool: "salt_usage",
                param: "storms",
                value: v,
              });
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 p-3 bg-muted rounded-md border border-border" role="status" aria-live="polite">
        <div className="text-sm font-medium text-foreground">
          <span className="block">Monthly usage: ~<span className="text-accent font-semibold">{monthlyTons}</span> tons</span>
          <span className="block">Season estimate: ~<span className="text-accent font-semibold">{seasonTons}</span> tons</span>
        </div>
      </div>
    </div>
  );
}
