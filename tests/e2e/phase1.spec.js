const { test, expect } = require("@playwright/test");

test("Chinese homepage uses the editorial notebook shell", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".rx-brand-title")).toContainText("日新笔记");
  await expect(page.locator(".rx-brand-subtitle")).toContainText("Quentin");
  await expect(page.locator(".rx-seal").first()).toBeVisible();
  await expect(page.locator(".rx-article-row").first()).toBeVisible();
  await expect(page.locator(".grid.gap-4")).toHaveCount(0);
  await expect(page.locator(".single_hero_background")).toHaveCount(0);
});

test("English homepage uses Quentin branding", async ({ page }) => {
  await page.goto("/en/");

  await expect(page.locator(".rx-brand-title")).toContainText("Quentin");
  await expect(page.locator("body")).not.toContainText("Nautilus Notes");
});

test("series and article pages avoid card grids and hero shells", async ({ page }) => {
  await page.goto("/pve/");
  await expect(page.locator(".rx-series-row").first()).toBeVisible();
  await expect(page.locator(".grid.gap-4")).toHaveCount(0);

  await page.goto("/pve/安装-proxmox-virtual-environment-ve/");
  await expect(page.locator(".rx-article-header h1")).toContainText("安装");
  await expect(page.locator(".single_hero_background")).toHaveCount(0);
  await expect(page.locator(".rx-article-signoff .rx-seal")).toBeVisible();
});

test("about navigation points to a bilingual about page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "关于" })).toHaveAttribute("href", "/about/");

  await page.goto("/about/");
  await expect(page.locator(".rx-article-header h1")).toContainText("关于");
  await expect(page.locator(".rx-content")).toContainText("日新笔记");

  await page.goto("/en/about/");
  await expect(page.locator(".rx-article-header h1")).toContainText("About");
  await expect(page.locator(".rx-content")).toContainText("Quentin");
});

test("search shows results and a warm no-results state", async ({ page }) => {
  await page.goto("/");
  await page.locator("#search-button").click();
  await expect(page.locator("#search-query")).toBeFocused();

  await page.locator("#search-query").fill("PVE");
  await expect(page.locator(".rx-search-result").first()).toBeVisible();

  await page.locator("#search-query").fill("zzzzzzzz-no-match");
  await expect(page.locator("#search-status")).toContainText(/没有找到|No matching/);

  await page.keyboard.press("Escape");
  await expect(page.locator("#search-wrapper")).not.toBeVisible();
});

test("search reports index load failure", async ({ page }) => {
  await page.route("**/index.json", (route) =>
    route.fulfill({ status: 500, contentType: "application/json", body: "{}" }),
  );
  await page.goto("/");
  await page.locator("#search-button").click();
  await page.locator("#search-query").fill("PVE");

  await expect(page.locator("#search-status")).toContainText(/搜索暂时不可用|Search is temporarily unavailable/);
});

test("language fallback notice appears for missing translations", async ({ page }) => {
  await page.goto("/en/?missing_translation=1");
  await expect(page.locator("#translation-fallback-notice")).toBeVisible();
  await expect(page.locator("#translation-fallback-notice")).toContainText(/Not translated|未翻译/);
});
