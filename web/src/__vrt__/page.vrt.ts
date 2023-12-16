import path from 'path'

import { test, type Page, type TestInfo } from '@playwright/test'

interface TargetPage {
  name: string
  path: string
}

const screenshot = async (page: Page, testInfo: TestInfo, targetPage: TargetPage) => {
  const fileName = `${targetPage.name}.png`
  console.log({ testInfo })
  await page.goto(targetPage.path)
  await page.screenshot({
    fullPage: true,
    path: path.join(testInfo.project.snapshotDir, 'snapshots', fileName),
  })
}

const targetPage: TargetPage = {
  name: 'home',
  path: '/',
}

test.describe('screenshots', () => {
  test(targetPage.name, async ({ page }, testInfo) => {
    await screenshot(page, testInfo, targetPage)
  })
})
