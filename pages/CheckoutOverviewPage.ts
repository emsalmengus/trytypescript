import { Locator, Page, expect } from '@playwright/test';
import BasePage from './BasePage.ts';

export default class CheckoutOverviewPage extends BasePage {

  public products: Locator;
  private productPrice: Locator;
  private subtotalLabel: Locator;
  private cancelButton: Locator;
  private finishButton: Locator;
  private backHomeButton: Locator;


  constructor(page: Page) {
    super(page, 'Checkout Overview');
    this.products = this.page.locator('[data-test="inventory-item-name"]');
    this.productPrice = this.page.locator('[data-test="inventory-item-price"]');
    this.subtotalLabel = this.page.locator('[data-test="subtotal-label"]');
    this.cancelButton = this.page.locator('[data-test="cancel"]');
    this.finishButton = this.page.locator('[data-test="finish"]');
    this.backHomeButton = this.page.locator('[data-test="back-to-products"]');
  }

  public cancelCheckout = async (): Promise<void> => {
    await this.cancelButton.click();
  }

  public finishCheckout = async (): Promise<void> => {
    await this.finishButton.click();
  }

  public goBackHome = async (): Promise<void> => {
    await this.backHomeButton.click();
  }

    public calculateSubtotal = async (): Promise<number> => {
      const productPriceWithText = await this.productPrice.allTextContents();
              const itemPrice = productPriceWithText.map(item => item.split('$')[1]);
        let result = 0;
        for (let i = 0; i < itemPrice.length; i++) {
            const price = parseFloat(itemPrice[i]);
          if (!isNaN(price)) {
              result += price;
          } else {
              console.error('The following price is null or undefined: ${itemPrice[i]}');
          }
      }
      return result;
  }

  public calculateExpectedSubtotal = async(): Promise<number> => {
    const subtotalWithText = await this.subtotalLabel.textContent();
    if (subtotalWithText === null || subtotalWithText === undefined) {
      throw new Error('The subtotal is null or undefined.');
    }
    const expectedSubtotal = subtotalWithText.split('$')[1];
    return parseFloat(expectedSubtotal);
  }

}