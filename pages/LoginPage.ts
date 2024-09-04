import type { Locator, Page, expect } from '@playwright/test';
import BasePage from '../pages/BasePage.ts';
import User from '../data/User.ts';
import Credentials from '../data/Credentials.ts';

export default class LoginPage extends BasePage {
  goto() {
    throw new Error('Method not implemented.');
  }

  private usernameField: Locator;
  private passwordField: Locator;
  private logInButton: Locator;

  constructor(page: Page) {
    super(page, '');
    this.usernameField = this.page.locator('[data-test="username"]');
    this.passwordField = this.page.locator('[data-test="password"]');
    this.logInButton = this.page.locator('[data-test="login-button"]');
  }


  public loginToApp = async(): Promise<void> => { 
    await this.page.goto('https://www.saucedemo.com/');
    await this.usernameField.fill(Credentials.USER_IS_OK);
    await this.usernameField.fill(Credentials.PASS_IS_OK);
    await this.logInButton.click();
}

  private async enterEmail(userName: string): Promise<void> {
    await this.usernameField.fill(userName);
}

private async enterPassword(userPassword: string): Promise<void> {
    await this.passwordField.fill(userPassword);
}

private async clickOnLogInButton(): Promise<void> {
    await this.logInButton.click();
}

public async logInWithCredentials(credentials: User): Promise<void> {
    const { userName, password } = credentials;
    await this.enterEmail(userName);
    await this.enterPassword(password);
    await this.clickOnLogInButton();
}
}