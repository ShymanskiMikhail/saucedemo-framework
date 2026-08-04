import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const validCredentials = {
  username: 'standard_user',
  password: 'secret_sauce',
};

test('Успешный логин', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(validCredentials.username, validCredentials.password);
  await expect(page).toHaveURL('/inventory.html');
});

test('Логин с пустым username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.fillPassword(validCredentials.password);
  await loginPage.submit();
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Username is required');
});

test('Логин заблокированного пользователя', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('locked_out_user', validCredentials.password);
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('locked out');
});
