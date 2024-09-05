import { test, expect } from '@playwright/test';

import LoginPage  from '../pages/LoginPage.ts';
import Credentials from '../data/Credentials.ts';

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

});

test('should login with correct credentials', async ({page}) =>  {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApp();
});

test('should not login with locked out user', async ({page}) =>  {
  const loginPage = new LoginPage(page);
  await loginPage.loginToAppWith('locked_out_user','wrong_pass');
});

