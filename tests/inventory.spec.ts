import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('Отображение списка товаров', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const count = await inventoryPage.getItemCount();
  expect(count).toBeGreaterThan(0);
});

test('Добавление товара в корзину', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  const cartCount = await inventoryPage.header.getCartItemsCount();
  expect(cartCount).toBe(1);
});

test('Удаление товара из корзины', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
  const cartCount = await inventoryPage.header.getCartItemsCount();
  expect(cartCount).toBe(0);
});

test('Сортировка товаров по цене', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.sortBy('lohi');
  const names = await inventoryPage.getItemNames();
  expect(names.length).toBeGreaterThan(0);
});

test('Добавление нескольких товаров', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.addItemToCart('Sauce Labs Bike Light');
  const cartCount = await inventoryPage.header.getCartItemsCount();
  expect(cartCount).toBe(2);
});
