import { test, expect } from '@playwright/test';

test('test test', async ({ page }) => {
  // Go to root page
  await page.goto('/');
  // Pause test and open debug window
  await page.pause();
});
