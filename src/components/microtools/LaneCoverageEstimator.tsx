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
    <div className="rounded-lg border-2 border-blue-100 p-4 bg-blue-50/50">
      <h4 className="font-semibold mb-3 text-blue-900">Lane Coverage Estimator</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="text-sm">
          Blade width (ft)
          <select
            className="mt-1 w-full rounded-md border border-blue-200 px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
            className="mt-1 w-full accent-blue-600"
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
          <div className="text-xs text-blue-700 font-medium">{overlapPct}%</div>
        </label>
        <label className="text-sm">
          Average speed (mph)
          <input
            className="mt-1 w-full accent-blue-600"
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
          <div className="text-xs text-blue-700 font-medium">{speed} mph</div>
        </label>
      </div>
      <div className="mt-4 p-3 bg-blue-100/50 rounded-md border border-blue-200" role="status" aria-live="polite">
        <div className="text-sm font-medium text-blue-900">
          <span className="block">Coverage: ~{lanesPerHour} lanes/hour</span>
          <span className="block text-blue-700">Distance: ~{milesPerHour} miles/hour cleared</span>
        </div>
      </div>
    </div>
  );
}
