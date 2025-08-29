import { useMemo, useState } from "react";
import { emitAnalytics } from "../../lib/analytics";

export function LaneCoverageEstimator() {
  const [bladeWidth, setBladeWidth] = useState(10);
  const [overlapPct, setOverlapPct] = useState(10);
  const [speed, setSpeed] = useState(15);
  const laneWidth = 12;

  const effectiveWidth = useMemo(
    () => bladeWidth * (1 - overlapPct / 100),
    [bladeWidth, overlapPct]
  );
  const lanesPerHour = useMemo(
    () => ((speed * effectiveWidth) / laneWidth).toFixed(1),
    [speed, effectiveWidth]
  );
  const milesPerHour = useMemo(() => (speed * 0.9).toFixed(1), [speed]);

  return (
    <div className="rounded-lg border-2 border-border p-4 bg-muted">
      <h4 className="font-semibold mb-3 text-foreground">Lane Coverage Estimator</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="text-sm">
          Blade width (ft)
          <select
            className="mt-1 w-full rounded-md border border-border px-2 py-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={bladeWidth}
            onChange={(e) => {
              const v = Number(e.target.value);
              setBladeWidth(v);
              emitAnalytics("tool_input", {
                tool: "lane_coverage",
                param: "bladeWidth",
                value: v,
              });
            }}
          >
            {[8, 9, 10, 11, 12].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Overlap (%)
          <input
            className="mt-1 w-full accent-[color:var(--color-accent)]"
            type="range"
            min={0}
            max={25}
            value={overlapPct}
            onChange={(e) => {
              const v = Number(e.target.value);
              setOverlapPct(v);
              emitAnalytics("tool_input", {
                tool: "lane_coverage",
                param: "overlapPct",
                value: v,
              });
            }}
          />
          <div className="text-xs text-accent font-medium">{overlapPct}%</div>
        </label>
        <label className="text-sm">
          Average speed (mph)
          <input
            className="mt-1 w-full accent-[color:var(--color-accent)]"
            type="range"
            min={5}
            max={25}
            value={speed}
            onChange={(e) => {
              const v = Number(e.target.value);
              setSpeed(v);
              emitAnalytics("tool_input", {
                tool: "lane_coverage",
                param: "speed",
                value: v,
              });
            }}
          />
          <div className="text-xs text-accent font-medium">{speed} mph</div>
        </label>
      </div>
      <div className="mt-4 p-3 bg-muted rounded-md border border-border" role="status" aria-live="polite">
        <div className="text-sm font-medium text-foreground">
          <span className="block">Coverage: ~<span className="text-accent font-semibold">{lanesPerHour}</span> lanes/hour</span>
          <span className="block">Distance: ~<span className="text-accent font-semibold">{milesPerHour}</span> miles/hour cleared</span>
        </div>
      </div>
    </div>
  );
}
