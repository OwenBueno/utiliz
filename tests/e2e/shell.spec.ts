import { expect, test } from '@playwright/test';

test.describe('App shell', () => {
  test('navigates between tools with active sidebar state', async ({ page }) => {
    await page.goto('tools/text-analyzer/');
    await expect(page.locator('.sidebar-item.active')).toContainText('Text Analyzer');

    await page.goto('tools/image-converter/');
    await expect(page.locator('.sidebar-item.active')).toContainText('Image Converter');

    await page.goto('tools/md-previewer/');
    await expect(page.locator('.sidebar-item.active')).toContainText('MD Previewer');
  });

  test('persists theme preference across reload', async ({ page }) => {
    await page.goto('tools/text-analyzer/');
    await page.getByRole('button', { name: 'LIGHT MODE' }).click();
    await expect(page.locator('#theme-label')).toContainText('LIGHT');

    await page.reload();
    await expect(page.locator('#theme-label')).toContainText('LIGHT');
    await expect(page.locator('html')).toHaveClass(/light-mode/);
  });
});
