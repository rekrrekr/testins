import { test, expect } from '@playwright/test'

const routes = ['/', '/explore', '/privacy', '/terms']

for (const r of routes) {
  test(`loads ${r}`, async ({ page }) => {
    await page.goto(r)
    await expect(page).toHaveTitle(/Persona|Privacy|Terms/)
  })
}

test('persona detail loads from seed', async ({ page }) => {
  await page.goto('/explore')
  const card = page.locator('a:has-text("Voyager Strategist")')
  await card.first().click()
  await expect(page.locator('h1')).toContainText('Voyager Strategist')
})

test('chat streaming stub works', async ({ page }) => {
  await page.goto('/chat/demo')
  await page.getByPlaceholder('Type a message…').fill('Hello world')
  await page.getByRole('button', { name: 'Send' }).click()
  await expect(page.locator('text=Assistant is typing…')).toBeVisible()
  await expect(page.locator('text=Thanks for your message')).toBeVisible({ timeout: 10000 })
})