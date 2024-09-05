import { Locator, Page, expect } from '@playwright/test';
import BasePage from './BasePage.ts';

export default class InventoryPage extends BasePage {

  private productBackpack: Locator;
  private productBikeLight: Locator;
  private shoppingCart: Locator;

  constructor(page: Page) {
    super(page, 'Inventory');
    this.productBackpack = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.productBikeLight = this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.shoppingCart = this.page.locator('[data-test="shopping-cart-link"]');
  }

  public async addProductBackpack() {
    await this.productBackpack.click();
  }
  public async addProductBikeLight() {
    await this.productBikeLight.click();
  }

  public async checkNumberOfProductsInShoppingCart(expected: string) {
    const numberofProducts = await this.shoppingCart.textContent(); 
    expect(numberofProducts).toBe(expected);
  }

  public async openCart() {
    await this.shoppingCart.click({force: true});
  }

}