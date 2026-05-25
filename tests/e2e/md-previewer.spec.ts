import { expect, test } from '@playwright/test';

test('renders markdown preview on load', async ({ page }) => {
  await page.goto('tools/md-previewer/');
  await expect(page.locator('#mdPreview h1')).toContainText('Hello, World!');
  await expect(page.locator('#lineCount')).not.toHaveText('0');
});

test('updates preview when editor content changes', async ({ page }) => {
  await page.goto('tools/md-previewer/');
  await page.locator('#mdInput').fill('# New Title\n\nUpdated **content**.');
  await expect(page.locator('#mdPreview h1')).toContainText('New Title');
  await expect(page.locator('#mdPreview strong')).toContainText('content');
});
