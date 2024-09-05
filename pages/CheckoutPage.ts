import { Locator, Page, expect } from '@playwright/test';
import BasePage from './BasePage.ts';

export default class CheckoutPage extends BasePage {

  private title: Locator;
  private firstName: Locator;
  private lastName: Locator;
  private postalCode: Locator;
  private cancelButton: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    super(page, 'Checkout');
    this.title = this.page.locator('[data-test="title"]');
    this.firstName = this.page.locator('[data-test="firstName"]');
    this.lastName = this.page.locator('[data-test="lastName"]');
    this.postalCode = this.page.locator('[data-test="postalCode"]');
    this.cancelButton = this.page.locator('[data-test="cancel"]');
    this.continueButton = this.page.locator('[data-test="continue"]');
  }

  public completeCheckout = async (firstName: string, lastName:string, postalCode:string): Promise<void> => {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  public cancelCheckout = async (): Promise<void> => {
    await this.cancelButton.click();
  }


}