import { expect, test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ProductsInventoryPage from '../pages/ProductsInventoryPage';
import User from '../data/User.ts';
import Credentials from '../data/Credentials.ts';

test.describe('add two products to shopping cart', async () => {

    let loginPage: LoginPage;
    let productsInventoryPage: ProductsInventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsInventoryPage = new ProductsInventoryPage(page);
    });

    test('added products should be transferred to cart', async ({ page }) => {
        await loginPage.loginToApp();
        await page.waitForURL('https://www.saucedemo.com/inventory.html');
        await productsInventoryPage.addProductBackpack(); // add (remove etc.)
        await productsInventoryPage.addProductBikeLight();
        await productsInventoryPage.checkNumberOfProductsInShoppingCart("2");
        
    });
});