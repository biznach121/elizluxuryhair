import { defineConfig, devices } from "@playwright/test";

/**
 * Visual regression config — boots `bun dev` (mock + next), runs against
 * a stable Chromium, snapshots key pages.
 *
 * Run:
 *   bun run check:visual                  # compare against baseline
 *   bun run check:visual --update-snapshots   # accept new baseline
 *
 * Baselines live in `e2e/__snapshots__/`. Commit them.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    // Viewport snapshots are noisy across OS / browser builds. Lock here.
    viewport: { width: 1280, height: 800 },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
  ],

  expect: {
    // Anti-flake: allow tiny rendering differences (font hinting across runners).
    toHaveScreenshot: { maxDiffPixelRatio: 0.01 },
  },

  webServer: {
    command: "bun dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
