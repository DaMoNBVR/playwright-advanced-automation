import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('SauceDemo Authentication Suite', () => {
  
  test('Should block locked out user and handle expected 401 network error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const networkErrors: string[] = []; 

    // 1. SETTING UP THE NETWORK INTERCEPTOR
    // We capture any 400+ status, as it might indicate an issue
    page.on('response', response => {
      if (response.status() >= 400) {
        networkErrors.push(`[${response.status()}] ${response.url()}`);
      }
    });

    await loginPage.navigate();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    
    // Sincronization point
    await page.waitForLoadState('networkidle');

    // 2. THE SENIOR FIX:
    // A 401 is expected when a user is locked out. We shouldn't fail the test.
    // Instead, we validate that the system responded with exactly the expected error.
    const hasExpectedError = networkErrors.some(error => error.includes('[401]'));
    expect(hasExpectedError, 'Expected a 401 error for locked out user, but found none').toBeTruthy();
  });

  test('Should login valid user from .env with clean network traffic', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const networkErrors: string[] = [];

    // 1. SETTING UP THE NETWORK INTERCEPTOR (Before navigation)
    page.on('response', response => {
      if (response.status() >= 400) {
        networkErrors.push(`[${response.status()}] ${response.url()}`);
      }
    });

    const user = process.env.SAUCE_USERNAME || '';
    const pass = process.env.SAUCE_PASSWORD || '';

    await loginPage.navigate();
    await loginPage.login(user, pass);
    await expect(page).toHaveURL(/.*inventory.html/);
    
    await page.waitForLoadState('networkidle');

    // 2. THE RUTHLESS ASSERTION
    // A valid login should NOT trigger any network errors.
    expect(networkErrors.length, `🚨 NETWORK BUGS DETECTED:\n${networkErrors.join('\n')}`).toBe(0);
  });

});