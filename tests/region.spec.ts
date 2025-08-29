import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

const STORAGE_KEY = "mtech-region";

test.describe("Region persistence (no banner)", () => {
  test("localStorage persists region and no banner is shown", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

    // Programmatically set region to Ohio
    await page.evaluate((key) => localStorage.setItem(key, "Ohio"), STORAGE_KEY);
    const savedOhio = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    expect(savedOhio).toBe("Ohio");

    // No banner should exist
    const banner = page.locator(".bg-sky-50");
    await expect(banner).toHaveCount(0);

    // Change to Michigan, still persisted, and still no banner
    await page.evaluate((key) => localStorage.setItem(key, "Michigan"), STORAGE_KEY);
    const savedMi = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    expect(savedMi).toBe("Michigan");
    await expect(banner).toHaveCount(0);

    // Reset to Other
    await page.evaluate((key) => localStorage.setItem(key, "Other"), STORAGE_KEY);
    const savedOther = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    expect(savedOther).toBe("Other");
    await expect(banner).toHaveCount(0);
  });
});
