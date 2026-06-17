import { test, expect } from "@playwright/test";

/**
 * Visual regression on the storefront's key surfaces. Catches CSS / layout
 * drift that the contract harness can't see.
 *
 * Anti-flake notes:
 *   - We disable animations (CSS transitions can leave half-frame snapshots).
 *   - We mask images (Unsplash / CDN URLs occasionally render slight pixel
 *     differences). The container layout is what we're regressing on, not
 *     image bytes.
 *   - Fonts are served by `next/font` and locked at build time, but if you
 *     see flake on a fresh CI runner, `await page.evaluate(() => document.fonts.ready)`
 *     before the snapshot.
 */
test.describe("visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({
      content: `*, *::before, *::after { animation: none !important; transition: none !important; }`,
    });
  });

  test("homepage", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot("homepage.png", {
      fullPage: true,
      mask: [page.locator("img")],
    });
  });

  test("shop / catalogue", async ({ page }) => {
    await page.goto("/shop");
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot("shop.png", {
      fullPage: true,
      mask: [page.locator("img")],
    });
  });

  test("cart drawer after adding a product", async ({ page }) => {
    await page.goto("/products/studio-tee-natural");
    await page.evaluate(() => document.fonts.ready);
    // Click whatever the storefront's primary Add-to-Cart button is.
    await page.getByRole("button", { name: /add to cart/i }).first().click();
    // Drawer auto-opens via CartDrawerProvider's openOnAdd watcher.
    await expect(page.getByRole("dialog", { name: /cart/i })).toBeVisible();
    await expect(page).toHaveScreenshot("cart-drawer.png", {
      mask: [page.locator("img")],
    });
  });
});
