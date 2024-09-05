import { Locator, Page, expect } from '@playwright/test';
import BasePage from '../pages/BasePage.ts';
import Credentials from '../data/Credentials.ts';

export default class LoginPage extends BasePage {

  private usernameField: Locator;
  private passwordField: Locator;
  private logInButton: Locator;
  private errorButton: Locator;

  constructor(page: Page) {
    super(page, 'Login');
    this.usernameField = this.page.locator('[data-test="username"]');
    this.passwordField = this.page.locator('[data-test="password"]');
    this.logInButton = this.page.locator('[data-test="login-button"]');
  }

  public loginToApp = async (): Promise<void> => {
    await this.page.goto('https://www.saucedemo.com/');
    await this.usernameField.fill(Credentials.USER_IS_OK);
    await this.passwordField.fill(Credentials.PASS_IS_OK);
    await this.logInButton.click();
  }

  public loginToAppWith = async (username, password): Promise<void> => {
    await this.page.goto('https://www.saucedemo.com/');
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.logInButton.click();
  }

}