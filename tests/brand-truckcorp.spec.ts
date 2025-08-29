import { test } from "@playwright/test";
import fs from "node:fs";

const URL = "https://truckcorpllc.com/";
const OUT_PNG = "tests/__screenshots__/truckcorp-home.png";
const OUT_JSON = "test-results/truckcorp-colors.json";

test("screenshot: truckcorpllc.com home", async ({ page }) => {
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  // Let above-the-fold elements settle
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1200);
  await page.screenshot({ path: OUT_PNG, fullPage: true });
});

test("extract: dominant brand colors", async ({ page }) => {
  await page.goto(URL, { waitUntil: "domcontentloaded" });

  const colors = await page.evaluate(() => {
    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    const rgbToHex = (r: number, g: number, b: number) =>
      `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();

    const parse = (s?: string | null) => {
      if (!s) return null;
      const str = s.trim().toLowerCase();
      if (str === "transparent" || str === "inherit" || str === "initial") return null;
      if (str.startsWith("#")) {
        if (str.length === 4) return `#${str[1]}${str[1]}${str[2]}${str[2]}${str[3]}${str[3]}`;
        return str;
      }
      if (str.includes("gradient")) return null;
      const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (!m) return null;
      const [_, rs, gs, bs, as] = m;
      const a = as ? parseFloat(as) : 1;
      if (a < 0.2) return null;
      return rgbToHex(parseInt(rs), parseInt(gs), parseInt(bs));
    };

    const weightFor = (el: Element) => {
      const e = el as HTMLElement;
      const area = (e.clientWidth || 0) * (e.clientHeight || 0);
      return Math.max(1, Math.round(area / 5000));
    };

    const map = new Map<string, number>();
    const add = (hex: string | null, w = 1) => {
      if (!hex) return;
      map.set(hex, (map.get(hex) || 0) + w);
    };

    const els = Array.from(document.querySelectorAll("*"));
    for (const el of els) {
      const cs = getComputedStyle(el as HTMLElement);
      const w = weightFor(el);
      add(parse(cs.backgroundColor), w);
      add(parse(cs.color), 1);
      add(parse(cs.borderTopColor), 0.5);
      add(parse(cs.borderRightColor), 0.5);
      add(parse(cs.borderBottomColor), 0.5);
      add(parse(cs.borderLeftColor), 0.5);
    }

    const top = Array.from(map.entries())
      .filter(([hex]) => hex !== "#ffffff" || (map.get(hex) || 0) > 15)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 24)
      .map(([hex, count]) => ({ hex, count }));

    return top;
  });

  fs.mkdirSync("test-results", { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(colors, null, 2));
  console.log("TRUCKCORP_COLORS_JSON=" + JSON.stringify(colors));
});

