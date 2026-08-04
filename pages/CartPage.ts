import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartList: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = page.locator('.cart_list');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async getItemCount(): Promise<number> {
    return await this.page.locator('.cart_item').count();
  }

  async removeItem(itemName: string): Promise<void> {
    const item = this.page.locator('.cart_item').filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
