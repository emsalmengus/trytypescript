import { expect, test } from '@playwright/test';
import LoginPage from '../pages/LoginPage.ts';
import CheckoutPage from '../pages/CheckoutPage.ts';
import InventoryPage from '../pages/InventoryPage.ts';

    let loginPage: LoginPage;
    let checkoutPage: CheckoutPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        checkoutPage = new CheckoutPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.loginToApp();
        await inventoryPage.addProductBackpack();
        await inventoryPage.addProductBikeLight();
        await inventoryPage.openCart();
        await page.getByText('Checkout').click();
    });

    test('should not checkout without information', async ({page}) => {
        const error = page.locator('[data-test="error"]');
        await checkoutPage.completeCheckout('','','');
        await expect(error).toContainText('Error: First Name is required');
        await checkoutPage.completeCheckout('test','','');
        await expect(error).toContainText('Error: Last Name is required');
        await checkoutPage.completeCheckout('test','test','');
        await expect(error).toContainText('Error: Postal Code is required');
        await checkoutPage.cancelCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(page.getByText('Your Cart')).toContainText('Your Cart');
    });

    test('should checkout with information', async ({page}) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        await expect(page.getByText('Checkout: Your Information')).toContainText('Checkout: Your Information');
        await checkoutPage.completeCheckout('test','test','01234');
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await expect(page.getByText('Checkout: Overview')).toContainText('Checkout: Overview');
    });
