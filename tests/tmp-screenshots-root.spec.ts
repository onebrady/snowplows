import { test } from "@playwright/test";

const BASE = process.env.BASE_URL || "http://localhost:5173/#/";

test("root: desktop screenshot", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: "tests/__screenshots__/root-desktop.png",
    fullPage: true,
  });
});

test("root: tablet screenshot", async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 1180 });
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: "tests/__screenshots__/root-tablet.png",
    fullPage: true,
  });
});

test("root: mobile screenshot", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: "tests/__screenshots__/root-mobile.png",
    fullPage: true,
  });
});

