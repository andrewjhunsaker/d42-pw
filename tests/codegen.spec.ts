import { test, expect } from '@playwright/test';

test('test test', async ({ page }) => {
  // Go to root page
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await page.pause();
  await expect(page).toHaveTitle('Home');
});
