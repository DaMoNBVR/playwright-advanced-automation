import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Estos selectores son 100% estables y diseñados para testing
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('#login-button');
    // Así se localiza un error dinámico en React
    this.errorMessage = page.locator('[data-test="error"]'); 
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.signInButton.click();
  }
}