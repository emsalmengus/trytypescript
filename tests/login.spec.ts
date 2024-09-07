import { test, expect } from '@playwright/test';

import LoginPage  from '../pages/LoginPage.ts';
import Credentials from '../data/Credentials.ts';

test('should login with standard user', async ({page}) =>  {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApp();
  try{
    expect(page).toHaveTitle(/Swag Labs/);
    expect(page.getByText('Products')).toContainText('Products');
  } catch(error){
    console.log("An error occured", error);
}
});

test('should not login with locked out user', async ({page}) =>  {
  const loginPage = new LoginPage(page);
  const locator = page.locator('[data-test="error"]');
  await loginPage.loginToAppWith(Credentials.USER_LOCKED,Credentials.PASS_IS_OK);
  expect(locator).toContainText('Epic sadface: Sorry, this user has been locked out.');
});

test('should not login with wrong user', async ({page}) =>  {
  const loginPage = new LoginPage(page);
  const locator = page.locator('[data-test="error"]');
  await loginPage.loginToAppWith(Credentials.USER_WRONG,Credentials.PASS_WRONG);
  expect(locator).toContainText('Epic sadface: Username and password do not match any user in this service');
});

test('should not login with empty credentials', async ({page}) =>  {
  const loginPage = new LoginPage(page);
  const locator = page.locator('[data-test="error"]');
  await loginPage.loginToAppWith(Credentials.USER_EMPTY,Credentials.PASS_EMPTY);
  expect(locator).toContainText('Epic sadface: Username is required');
  await loginPage.loginToAppWith(Credentials.USER_EMPTY,Credentials.PASS_IS_OK);
  expect(locator).toContainText('Epic sadface: Username is required');
  await loginPage.loginToAppWith(Credentials.USER_IS_OK,Credentials.PASS_EMPTY);
  expect(locator).toContainText('Epic sadface: Password is required');
});


/*
### Login with problem_user
### Login with error_user*/
