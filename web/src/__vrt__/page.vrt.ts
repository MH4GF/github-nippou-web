import { test, type Page, type TestInfo, expect } from '@playwright/test'

interface TargetPage {
  name: string
  path: string
}

const screenshot = async (page: Page, testInfo: TestInfo, targetPage: TargetPage) => {
  console.log({ testInfo })
  await page.goto(targetPage.path)

  await expect(page).toHaveScreenshot({ fullPage: true })
}

const targetPage: TargetPage = {
  name: 'home',
  path: '/',
}

test(targetPage.name, async ({ page }, testInfo) => {
  await screenshot(page, testInfo, targetPage)
})
