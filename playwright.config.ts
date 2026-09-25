import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    channel: process.env.PW_CHANNEL || undefined,
  },
  workers: 1,
  reporter: "list",
});
