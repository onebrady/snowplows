import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/#/";

test.describe("Navigation", () => {
  test("root renders knowledge hub without header", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    // Expect the page to render a main heading for the active section
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });

  test("section page has back to Knowledge Hub link", async ({ page }) => {
    await page.goto(BASE_URL + "section/plows-101", {
      waitUntil: "domcontentloaded",
    });
    const link = page.getByRole("link", { name: /back to knowledge hub/i });
    await expect(link).toBeVisible();
  });
});
