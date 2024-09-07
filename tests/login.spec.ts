import { test, expect } from '@playwright/test';

import LoginPage from '../pages/LoginPage.ts';
import Credentials from '../data/Credentials.ts';

test('should login with standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApp();
});

test('should not login with locked out user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToAppWith(Credentials.USER_LOCKED, Credentials.PASS_IS_OK);
  await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
});

test('should not login with wrong user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToAppWith(Credentials.USER_WRONG, Credentials.PASS_WRONG);
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('should not login with empty credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToAppWith(Credentials.USER_EMPTY, Credentials.PASS_EMPTY);
  expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
  await loginPage.loginToAppWith(Credentials.USER_EMPTY, Credentials.PASS_IS_OK);
  expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
  await loginPage.loginToAppWith(Credentials.USER_IS_OK, Credentials.PASS_EMPTY);
  //expect(page.getByTitle('Epic sadface: Password is required')).toBeVisible();
});