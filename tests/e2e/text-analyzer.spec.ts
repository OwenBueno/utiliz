import { expect, test } from '@playwright/test';

test('updates word count as user types', async ({ page }) => {
  await page.goto('tools/text-analyzer/');
  await page.locator('#textInput').fill('hello world');
  await expect(page.locator('#wordCount')).toHaveText('2');
  await expect(page.locator('#charTotal')).toHaveText('11');
});
