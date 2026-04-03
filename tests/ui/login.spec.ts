import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Suite de Autenticación en SauceDemo', () => {
  
  test('Debe bloquear a un usuario bloqueado y tener tráfico de red limpio', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const erroresDeRed: string[] = []; 

    // 1. EL ESPÍA VA PRIMERO
    page.on('response', response => {
  const status = response.status();
  
  // Excluimos status 0 porque a veces son peticiones canceladas por el mismo navegador (normal)
  // Atrapamos CUALQUIER error de cliente (4xx) o de servidor (5xx)
  if (status >= 400) {
    erroresDeRed.push(`🛑 Falla Crítica -> Status: ${status} | URL: ${response.url()}`);
  }
});

    await loginPage.navigate();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();

    // 2. LA SINCRONIZACIÓN (El truco Senior)
    // Le decimos a Playwright: "Espera a que no haya más de 2 peticiones de red 
    // activas por al menos medio segundo". Esto asegura que los procesos de fondo terminen.
    await page.waitForLoadState('networkidle');

    // 3. LA ASERCIÓN IMPLACABLE
    expect(erroresDeRed.length, `🚨 BUGS DE RED DETECTADOS:\n${erroresDeRed.join('\n')}`).toBe(0);
  });

  test('Debe permitir el login con un usuario válido desde .env y tener tráfico de red limpio', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const erroresDeRed: string[] = [];

    page.on('response', response => {
  const status = response.status();
  
  // Excluimos status 0 porque a veces son peticiones canceladas por el mismo navegador (normal)
  // Atrapamos CUALQUIER error de cliente (4xx) o de servidor (5xx)
  if (status >= 400) {
    erroresDeRed.push(`🛑 Falla Crítica -> Status: ${status} | URL: ${response.url()}`);
  }
});

    const user = process.env.SAUCE_USERNAME || '';
    const pass = process.env.SAUCE_PASSWORD || '';

    await loginPage.navigate();
    await loginPage.login(user, pass);

    await expect(page).toHaveURL(/.*inventory.html/);

    // 2. LA SINCRONIZACIÓN
    await page.waitForLoadState('networkidle');

    // 3. LA ASERCIÓN
    expect(erroresDeRed.length, `🚨 BUGS DE RED DETECTADOS:\n${erroresDeRed.join('\n')}`).toBe(0);
  });

});