import { test } from "@playwright/test";

test("screenshot: current knowledge page layout", async ({ page }) => {
  await page.goto("http://localhost:5173/#/", {
    waitUntil: "domcontentloaded",
  });
  
  // Wait for content to load
  await page.waitForTimeout(2000);
  
  await page.screenshot({
    path: "tests/__screenshots__/current-knowledge-page.png",
    fullPage: true,
  });
});

test("screenshot: current knowledge page mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("http://localhost:5173/#/", {
    waitUntil: "domcontentloaded",
  });
  
  // Wait for content to load
  await page.waitForTimeout(2000);
  
  await page.screenshot({
    path: "tests/__screenshots__/mobile-knowledge-page.png",
    fullPage: true,
  });
});
