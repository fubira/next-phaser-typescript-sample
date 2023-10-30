import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT || 3900;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  retries: 2,
  workers: 1,

  webServer: {
    command: `npm run dev`,
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL,
    trace: 'retry-with-trace',
  },

  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
    // { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  ],
  expect: {
    toMatchSnapshot: { threshold: 0.3 },
  },
});
