import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the SauceDemo Login Page.
 * Encapsulates selectors and logic for the authentication flow.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Stable selectors designed for reliable automated testing
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('#login-button');
    
    // Locating dynamic React error messages using data attributes
    this.errorMessage = page.locator('[data-test="error"]'); 
  }

  /**
   * Navigates to the base URL defined in the configuration.
   */
  async navigate() {
    await this.page.goto('/');
  }

  /**
   * Executes the login sequence.
   * @param user The username string
   * @param pass The password string
   */
  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.signInButton.click();
  }
}