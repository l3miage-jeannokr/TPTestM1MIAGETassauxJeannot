import { test, expect } from '@playwright/test';
import { describe, it } from 'node:test';

//Base des tests à venir (en plus de vérif que la page est bien chargée) made in AI

test('page loads successfully', async ({ page }) => {
  await page.goto('/');

  // Check that the page has loaded with todo list elements
  await expect(page.locator('body')).toBeVisible();
});

describe("Scénario nominal 3add ")
it("ajout de 3 taches différentes puis complétion successive puis remove succesif", async () => {
    await displayedListEmpty()
    await footerDisplayed(false)
    await addItem("révision P&C")
    await footerDisplayed(true)
    await displayedListIs([
        {checked=false, label="révision P&C"}])
    await addItem("révision Système")
    await footerDisplayed(true)
    await displayedListIs([
        {checked=false, label="révision P&C"}, 
        {checked=false, label="révision Système"}])
    await addItem("TP IHM")
    await footerDisplayed(true)
    await displayedListIs([
        {checked=false, label="révision P&C"}, 
        {checked=false, label="révision Système"},
        {checked=false, label="TP IHM"}])
    await 
    })