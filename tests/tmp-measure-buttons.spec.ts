import { test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

test("log category button heights on root", async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  const sizes = await page.evaluate(() => {
    const grid = document.querySelectorAll('div.grid')[0];
    if (!grid) return [] as number[];
    const buttons = Array.from(grid.querySelectorAll('button'));
    return buttons.slice(0, 7).map((b) => (b as HTMLElement).getBoundingClientRect().height);
  });
  console.log("Category button heights:", sizes);
});

