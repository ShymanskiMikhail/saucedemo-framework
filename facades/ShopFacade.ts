import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

export class ShopFacade {
  private readonly loginPage: LoginPage;
  private readonly inventoryPage: InventoryPage;

  constructor(public readonly page: Page) {
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
  }

  async loginAndAddItemToCart(
    username: string,
    password: string,
    itemName: string
  ): Promise<void> {
    await this.loginPage.navigate();
    await this.loginPage.login(username, password);
    await this.inventoryPage.addItemToCart(itemName);
  }
}
