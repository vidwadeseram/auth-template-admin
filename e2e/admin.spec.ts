import { test, expect } from "@playwright/test";

test.describe("Admin Auth", () => {
  test("redirects to login when not authenticated", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });

  test("login page renders", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /admin login/i })).toBeVisible();
  });
});

test.describe("Admin Pages (visual only)", () => {
  test.skip("dashboard shows admin cards", async ({ page }) => {
    // Requires auth - skip in CI without backend
    await page.goto("/dashboard");
    await expect(page.getByText("Admin Dashboard")).toBeVisible();
  });
});
