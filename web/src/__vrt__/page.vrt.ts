import { test, type Page, type TestInfo, expect } from '@playwright/test'

interface TargetPage {
  name: string
  path: string
}

const screenshot = async (page: Page, testInfo: TestInfo, targetPage: TargetPage) => {
  console.log({ testInfo })
  await page.goto(targetPage.path)

  return page.screenshot({ fullPage: true })
}

const compare = async (page: Page, testInfo: TestInfo, targetPage: TargetPage) => {
  const result = await screenshot(page, testInfo, targetPage)
  expect(result).toMatchSnapshot()
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

test.describe('compare', () => {
  test(targetPage.name, async ({ page }, testInfo) => {
    await compare(page, testInfo, targetPage)
  })
})
