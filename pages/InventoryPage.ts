import { Page, Locator } from '@playwright/test';
import { Header } from '../components/Header';

export class InventoryPage {
  readonly page: Page;
  readonly header: Header;
  readonly inventoryList: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.inventoryList = page.locator('.inventory_list');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  async addItemToCart(itemName: string): Promise<void> {
    const item = this.page
      .locator('.inventory_item')
      .filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeItemFromCart(itemName: string): Promise<void> {
    const item = this.page
      .locator('.inventory_item')
      .filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getItemCount(): Promise<number> {
    return await this.page.locator('.inventory_item').count();
  }

  async getItemNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }
}
