import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const samplePng = path.join(__dirname, '../fixtures/sample.png');

test('shows preview after uploading an image', async ({ page }) => {
  await page.goto('tools/image-converter/');
  await page.locator('#fileInput').setInputFiles(samplePng);

  await expect(page.locator('#previewArea')).toHaveClass(/visible/);
  await expect(page.locator('#imgName')).toContainText('sample.png');
  await expect(page.locator('#convertBtn')).toBeEnabled();
});
