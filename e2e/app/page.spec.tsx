import { test, expect } from '@playwright/test'
import { stripEnviromnentalFactorsFromHTML } from '../helper';

test.beforeEach(async ({}, testInfo) => {
  testInfo.snapshotSuffix = '';
});

test.describe('app', () => {
  test('Should match snapshots', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    expect(stripEnviromnentalFactorsFromHTML(await page.innerHTML("html"))).toMatchSnapshot('snapshot');
  });
})
