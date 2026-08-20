import { expect, test } from '@playwright/test';

// Catches `/` failing to render the themed proof screen, CSS reset, or a clean browser console.
test('loads the ADS proof screen at mobile width without console errors', async ({
  page,
}) => {
  const consoleErrors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'PACE' }),
  ).toBeVisible();
  await expect(page.getByText('Your personal running coach.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', /light:/);

  const bodyMargin = await page.locator('body').evaluate((body) => {
    return window.getComputedStyle(body).margin;
  });

  expect(bodyMargin).toBe('0px');
  expect(consoleErrors).toEqual([]);
});
