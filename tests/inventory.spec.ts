import { expect, test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage.ts';

    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.loginToApp();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('should add two products, display in cart and remove', async ({page}) => {
        const price = page.locator('[data-test="inventory-item-price"]');
        const quantity = page.locator('[data-test="item-quantity"]');
        const removeBike = page.locator('[data-test="remove-sauce-labs-bike-light"]');
        const removeBackpack = page.locator('[data-test="remove-sauce-labs-backpack"]');
        await inventoryPage.addProductBackpack(); // add (remove etc.)
        await inventoryPage.addProductBikeLight();
        await inventoryPage.checkNumberOfProductsInShoppingCart("2");
        await inventoryPage.openCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(page.getByText('Your Cart')).toContainText('Your Cart');
        await expect(page.getByText('Sauce Labs Backpack')).toContainText('Sauce Labs Backpack');
        await expect(page.getByText('Sauce Labs Bike Light')).toContainText('Sauce Labs Bike Light');
        await expect(price).toHaveCount(2);
        await expect(quantity).toHaveCount(2);
        await removeBackpack.click();
        await removeBike.click();
        await page.getByText('Continue Shopping').click();
        await expect(page.getByText('Products')).toContainText('Products');
        await inventoryPage.checkNumberOfProductsInShoppingCart("");
    });