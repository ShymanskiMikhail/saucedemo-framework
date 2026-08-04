import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('Переход в корзину через иконку', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.header.goToCart();
  await expect(page).toHaveURL('/cart.html');
});

test('Товар отображается в корзине', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.header.goToCart();

  const cartPage = new CartPage(page);
  const itemCount = await cartPage.getItemCount();
  expect(itemCount).toBe(1);
});

test('Удаление товара из корзины', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.header.goToCart();

  const cartPage = new CartPage(page);
  await cartPage.removeItem('Sauce Labs Backpack');
  const itemCount = await cartPage.getItemCount();
  expect(itemCount).toBe(0);
});
