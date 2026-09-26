import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

test("language, theme, events, chalisa reader, gallery, policies and demo form", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "hi");
  await expect(page.locator("h1")).toContainText("महावीर मंदिर");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await expect(page.locator("h1")).toContainText("Mahavir Mandir");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).not.toHaveAttribute("data-pending");

  // Next weekly event is highlighted automatically.
  await expect(page.locator(".event-card.featured")).toHaveCount(1);
  await expect(page.locator(".event-badge")).toContainText("Up next");
  await page
    .getByRole("button", { name: "View details", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toContainText("Tuesday Special Puja");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);

  // Chalisa reader: Hindi text matches the source file exactly; Roman tab works.
  await page
    .getByRole("button", { name: "Hindi (Devanagari)", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const scrollBefore = await page.evaluate(() => window.scrollY);
  const source = readFileSync("hanuman-chalisha-hindi.txt", "utf8");
  const rendered = await page.locator(".complete-chalisa").innerText();
  expect(rendered.replace(/\s/g, "")).toBe(source.replace(/\s/g, ""));
  await expect(page.locator(".complete-chalisa")).toHaveAttribute("lang", "hi");
  await expect(page.locator(".complete-chalisa h3")).toBeFocused();
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "English (transliteration)" })
    .click();
  await expect(page.locator(".complete-chalisa")).toHaveAttribute("lang", "en");
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);
  await expect(page.locator(".complete-chalisa")).toContainText(
    "Jai Hanuman gyan gun sagar",
  );
  expect(page.context().pages()).toHaveLength(1);
  await page.getByRole("button", { name: "Close", exact: true }).click();

  // Gallery filters, lightbox and keyboard navigation.
  await page
    .locator(".gallery-filters")
    .getByRole("button", { name: "Puja", exact: true })
    .click();
  await expect(page.locator(".gallery-photo")).toHaveCount(1);
  await page
    .locator(".gallery-filters")
    .getByRole("button", { name: "All", exact: true })
    .click();
  const total = await page.locator(".gallery-photo").count();
  await page.locator(".gallery-photo").first().click();
  await page.getByRole("button", { name: "Next image" }).click();
  await expect(page.getByRole("dialog")).toContainText(`2 / ${total}`);
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("dialog")).toContainText(`1 / ${total}`);
  await page.keyboard.press("Escape");

  // Chalisa audio is present but not downloaded until played.
  await expect(page.locator(".chalisa-player audio")).toHaveAttribute(
    "src",
    /\.mp3$/,
  );
  await expect(page.locator(".chalisa-player audio")).toHaveAttribute(
    "preload",
    "none",
  );

  // Video previews embed the player only after play is pressed.
  await expect(page.locator(".video-frame iframe")).toHaveCount(0);
  await page.locator(".video-poster").first().click();
  await expect(page.locator(".video-frame iframe").first()).toHaveAttribute(
    "src",
    /youtube-nocookie\.com\/embed\//,
  );

  // Donation QR and UPI payment link.
  await expect(page.locator('a[href^="upi:"]')).toHaveCount(1);
  await expect(page.locator(".qr-frame img")).toBeVisible();

  // Contact form validation and demo mode.
  await page.getByLabel("Mobile number").fill("12345");
  await page.getByLabel("Your name").fill("Test Visitor");
  await page.getByLabel("Subject").fill("Visiting hours");
  await page
    .getByLabel("Your message")
    .fill("Please confirm the temple opening hours.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator('.contact-form [role="status"]')).toHaveText("");
  await page.getByLabel("Mobile number").fill("+91 9876543210");
  await page.getByLabel("Email", { exact: true }).fill("visitor@example.com");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator('.contact-form [role="status"]')).toContainText(
    "No message was sent",
  );

  await page
    .getByRole("button", { name: "Privacy policy", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText(
    "does not send or store",
  );
  await page.keyboard.press("Escape");

  // Announcement banner is driven by the announcements data.
  await expect(page.locator(".announcement")).toContainText(
    "Tuesday Special Puja",
  );
  await expect(page.locator(".notice.important")).toHaveCount(1);

  for (const anchor of await page
    .locator('a[href^="#"]')
    .evaluateAll((els) => els.map((e) => e.getAttribute("href")!))) {
    await expect(page.locator(anchor)).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});

test("responsive layouts, mobile menu and image loading", async ({ page }) => {
  await page.goto("/");
  for (const language of ["English", "हिंदी"]) {
    await page.getByRole("button", { name: language, exact: true }).click();
    for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${language} at ${width}px`,
      ).toBeTruthy();
    }
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "मेनू खोलें" }).click();
  await expect(page.locator("nav")).toBeVisible();
  await expect(page.locator("nav a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("nav")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "मेनू खोलें" })).toBeFocused();
  await page.getByRole("button", { name: "मेनू खोलें" }).click();
  await page
    .locator("nav")
    .getByRole("link", { name: "गैलरी", exact: true })
    .click();
  await expect(page.locator("nav")).not.toBeVisible();
  await page.evaluate(async () => {
    for (const img of document.images) {
      img.loading = "eager";
      await img.decode().catch(() => {});
    }
  });
  expect(
    await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs.every(
          (i) =>
            (i as HTMLImageElement).complete &&
            (i as HTMLImageElement).naturalWidth > 0,
        ),
      ),
  ).toBeTruthy();
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page.getByRole("button", { name: "रंग रूप बदलें" }).click();
  await page.screenshot({ path: "test-results/dark.png", fullPage: true });
});

test("accessibility in both languages and themes", async ({ page }) => {
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const english of [false, true]) {
    if (english)
      await page.getByRole("button", { name: "English", exact: true }).click();
    for (const dark of [false, true]) {
      await page.evaluate(
        (theme) => (document.documentElement.dataset.theme = theme),
        dark ? "dark" : "light",
      );
      await page.waitForTimeout(500); // let colour transitions finish
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          description: v.description,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      ).toEqual([]);
    }
  }
  expect(errors).toEqual([]);
});
