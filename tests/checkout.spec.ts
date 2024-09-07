import { expect, test } from '@playwright/test';
import LoginPage from '../pages/LoginPage.ts';
import InventoryPage from '../pages/InventoryPage.ts';
import CheckoutPage from '../pages/CheckoutPage.ts';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage.ts';


    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let checkoutPage: CheckoutPage;
    let checkoutOverviewPage: CheckoutOverviewPage;


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage = new CheckoutOverviewPage(page);

        await loginPage.loginToApp();
        await inventoryPage.addProductBackpack();
        await inventoryPage.addProductBikeLight();
        await inventoryPage.openCart();
        await page.getByText('Checkout').click();
    });

    test('should not checkout without information', async ({page}) => {
        const error = page.locator('[data-test="error"]');
        await checkoutPage.completeCheckout('','','');
        expect(error).toContainText('Error: First Name is required');
        await checkoutPage.completeCheckout('test','','');
        expect(error).toContainText('Error: Last Name is required');
        await checkoutPage.completeCheckout('test','test','');
        expect(error).toContainText('Error: Postal Code is required');
        await checkoutPage.cancelCheckout();
        expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });

    test('should checkout with information', async ({page}) => {
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        expect(page.getByText('Checkout: Your Information')).toContainText('Checkout: Your Information');
        await checkoutPage.completeCheckout('test','test','01234');
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    });

    test('should not finish checkout completely if canceled', async ({page}) => {
        await checkoutPage.completeCheckout('test','test','01234');
        await checkoutOverviewPage.cancelCheckout();
        expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        expect(page.getByText('Products')).toContainText('Products');
        await inventoryPage.checkNumberOfProductsInShoppingCart("2");
    });

    
    test('should finish checkout completely', async ({page}) => {
        await checkoutPage.completeCheckout('test','test','01234');
        const expectedProduct = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
        expect(await checkoutOverviewPage.products.allTextContents()).toEqual(expectedProduct);
        const prices = await checkoutOverviewPage.calculateSubtotal();
        const subtotal = await checkoutOverviewPage.calculateExpectedSubtotal();
        expect(prices).toEqual(subtotal);
        await checkoutOverviewPage.finishCheckout();
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(page.getByText('Thank you for your order!')).toContainText('Thank you for your order!');
        await checkoutOverviewPage.goBackHome();
        expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });