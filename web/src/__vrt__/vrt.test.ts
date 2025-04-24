import { type Page, type TestInfo, expect, test } from '@playwright/test'

interface TargetPage {
  name: string
  path: string
}

const screenshot = async (page: Page, _testInfo: TestInfo, targetPage: TargetPage) => {
  await page.goto(targetPage.path)
  await expect(page).toHaveScreenshot({ fullPage: true })
}

const targetPages: TargetPage[] = [
  {
    name: 'home',
    path: '/',
  },
]

for (const targetPage of targetPages) {
  test(targetPage.name, async ({ page }, testInfo) => {
    await screenshot(page, testInfo, targetPage)
  })
}
