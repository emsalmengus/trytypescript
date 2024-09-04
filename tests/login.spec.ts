import { test, expect } from '@playwright/test';

import LoginPage  from '../pages/LoginPage.ts';

test('has title', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

  // Expect a text "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});


test('get started link', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  await page.getByTestId('secondary-header').check;
  await page.getByTestId('inventory-container').check;
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await expect(page).toHaveTitle(/Products/);
});

test('should login with correct credentials', async ({page}) =>  {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApp();
});

test('should not login with incorrect credentials', async ({page}) =>  {
});

