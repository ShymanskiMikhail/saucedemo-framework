import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const credentials = [
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    username: 'standard_user',
    password: 'wrong_password',
    expectedError:
      'Epic sadface: Username and password do not match any user in this service',
  },
  {
    username: '',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Username is required',
  },
];

for (const data of credentials) {
  test(`Негативный логин: ${data.username || 'пустое поле'}`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(data.username, data.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(data.expectedError);
  });
}
