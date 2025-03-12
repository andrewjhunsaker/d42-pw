// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();

async function globalSetup(config: FullConfig) {
  const storageStatePath = path.join(__dirname, 'storageState.json');
  
  // .env
  const baseURL = process.env.BASE_URL || 'https://10.91.2.23';
  const username = process.env.USERNAME || 'admin';
  const password = process.env.PASSWORD || 'adm!nd42';

  // Skip if we already have a saved session
  if (fs.existsSync(storageStatePath)) {
    console.log('Using existing authentication state.');
    return;
  }
  
  // No saved session found, login
  console.log('No storageState.json found. Logging in...');
  
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });
  const page = await context.newPage();

  console.log('Environment variables: ');
  console.log(`Base URL: ${baseURL}`);
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);

  // Navigate to login page
  await page.goto(baseURL);
  await page.waitForFunction(() => document.title.includes('Log in'));

  // Fill login form
  await page.fill('#id_username', username);
  await page.fill('#id_password', password);
  await page.click('button[type="submit"]');
  
  // Wait for title to equal Home
  await page.waitForFunction(() => document.title === 'Home');

  // Save the authentication state
  await context.storageState({ path: storageStatePath });
  console.log('Authentication state saved!');
  
  await browser.close();
}

export default globalSetup;