import { test, expect } from '@playwright/test';
import { ShopFacade } from '../facades/ShopFacade';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Полный цикл оформления заказа', async ({ page }) => {
  const shopFacade = new ShopFacade(page);
  await shopFacade.loginAndAddItemToCart(
    'standard_user',
    'secret_sauce',
    'Sauce Labs Backpack'
  );

  await shopFacade.goToCart();

  const cartPage = new CartPage(page);
  await cartPage.proceedToCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillDetails('Test', 'User', '12345');
  await checkoutPage.continue();
  await checkoutPage.finish();

  await expect(checkoutPage.completeHeader).toBeVisible();
  await expect(checkoutPage.completeHeader).toContainText('Thank you');
});

test('Оформление с пустыми полями', async ({ page }) => {
  const shopFacade = new ShopFacade(page);
  await shopFacade.loginAndAddItemToCart(
    'standard_user',
    'secret_sauce',
    'Sauce Labs Backpack'
  );

  await shopFacade.goToCart();

  const cartPage = new CartPage(page);
  await cartPage.proceedToCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.continue();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});
