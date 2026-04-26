import { test, expect } from "@playwright/test";

test.describe("Admin Auth", () => {
  test("redirects to login when not authenticated", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });

  test("login page renders", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText(/admin login/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });
});
