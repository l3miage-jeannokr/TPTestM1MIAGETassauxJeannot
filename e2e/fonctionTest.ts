import { Evenement } from './EvenementType';
import { Page, expect } from '@playwright/test';
import { AbstractPageTest } from './AbstractPageTest';

export class fonctionTest extends AbstractPageTest {
    constructor(page: Page) {
        super(page);
    }

    async clearAllItems(): Promise<void> {
        const items = this.page.locator('ul.todo-list > li');
        let itemCount = await items.count();

        while (itemCount > 0) {
            const item = items.nth(0);
            const deleteButton = item.locator('button.destroy');

            try {
                await deleteButton.click();
                await this.page.waitForSelector(`ul.todo-list > li:nth-child(${itemCount - 1})`, { state: 'detached' });
            } catch (error) {
                console.error(`Erreur lors de la suppression de l'élément : ${error}`);
            }

            itemCount = await items.count();
        }
    }

    /** Navigate to the todo list page */
    async goto(): Promise<void> {
        await this.page.goto('/l3m-2023-2024-angular-todolist', { waitUntil: 'networkidle' });
        await this.page.waitForSelector('input.new-todo', { timeout: 15000 });
    }

    /** Check if the displayed list is empty */
    async displayListeEmpty(): Promise<void> {
        const items = await this.page.locator('ul.todo-list li').count();
        expect(items).toBe(0);
    }

    /** Verify if footer is displayed or not */
    async footerDisplay(isDisplayed: boolean): Promise<void> {
        const footer = this.page.locator('footer.footer');
        if (isDisplayed) {
            await expect(footer).toBeVisible();
        } else {
            await expect(footer).not.toBeVisible();
        }
    }

    async addItem(item: string): Promise<void> {
        const input = this.page.locator('input.new-todo');
        await input.waitFor({ state: 'visible' });
        await input.fill(item);
        await input.press('Enter');

        if (item.trim() === '') {
            await this.page.waitForSelector('ul.todo-list li:has-text("")');
        } else {
            await this.page.waitForSelector(`ul.todo-list li:has-text("${item}")`);
        }
    }

    /** Verify the displayed list matches the expected events */
    async displayListeIs(events: Evenement[]): Promise<void> {
        const items = this.page.locator('ul.todo-list li');
        await expect(items).toHaveCount(events.length);

        for (let i = 0; i < events.length; i++) {
            const item = items.nth(i);
            const event = events[i];

            await expect(item).toContainText(event.label);

            const checkbox = item.locator('input[type="checkbox"]');
            if (event.checked) {
                await expect(checkbox).toBeChecked();
            } else {
                await expect(checkbox).not.toBeChecked();
            }
        }
    }

    /** Expect item to be visible in the main list (Étape 1) */
    async expectItemInMainList(item: string): Promise<void> {
        const mainList = this.page.locator('ul.todo-list');
        const itemElement = mainList.locator(`li:has-text("${item}")`);
        await expect(itemElement).toBeVisible();
    }

    /** Expect item to NOT be visible in the main list */
    async expectItemNotInMainList(item: string): Promise<void> {
        const mainList = this.page.locator('section').first().locator(`text="${item}"`);
        await expect(mainList).not.toBeVisible();
    }

    /** Expect item to be visible in the Step 2 list (Étape 2) */
    async expectItemInStep2List(item: string): Promise<void> {
        const step2Section = this.page.locator('section').nth(1);
        const itemInStep2 = step2Section.locator(`li:has-text("${item}")`);
        await expect(itemInStep2).toBeVisible();
    }

    /** Expect item to NOT be visible in the Step 2 list */
    async expectItemNotInStep2List(item: string): Promise<void> {
        const step2Section = this.page.locator('section').nth(1);
        const itemInStep2 = step2Section.locator(`li:has-text("${item}")`);
        await expect(itemInStep2).not.toBeVisible();
    }

    /** Delete an item from the todo list */
    async deleteItem(item: string): Promise<void> {
        const itemElement = this.page.locator(`li:has-text("${item}")`).first();
        await itemElement.hover();

        const deleteButton = itemElement.locator('button.destroy');
        await deleteButton.click();

        await this.page.waitForSelector(`li:has-text("${item}")`, { state: 'detached' });
    }

    /** Edit an existing item with a new value */
    async editItem(oldItem: string, newItem: string): Promise<void> {
        const itemElement = this.page.locator(`li:has-text("${oldItem}")`).first();
        const label = itemElement.locator('label');
        await label.dblclick();

        const editInput = itemElement.locator('input.edit');
        await editInput.fill(newItem);
        await editInput.press('Enter');

        try {
            if (newItem.trim() === '') {
                await this.page.waitForSelector(`li:has-text("${oldItem}")`, { state: 'detached', timeout: 5000 });

                const itemStillExists = await this.page.locator(`li:has-text("${oldItem}")`).count();
                if (itemStillExists > 0) {
                    throw new Error(`La tâche "${oldItem}" n'a pas été supprimée correctement.`);
                }
            } else {
                await this.page.waitForSelector(`li:has-text("${newItem}")`);
            }
        } catch (error) {
            console.error(`Erreur lors de la modification de la tâche "${oldItem}" :`, error);
            throw error;
        }
    }

    /** Check/complete an item in the todo list */
    async checkItem(item: string): Promise<void> {
        const itemElement = this.page.locator(`li:has-text("${item}")`).first();
        const checkbox = itemElement.locator('input[type="checkbox"]');
        await checkbox.check();

        await this.page.waitForSelector(`li:has-text("${item}") input[type="checkbox"]:checked`);
    }

    /** Expect item to be checked in the main list */
    async expectItemCheckedInMainList(item: string): Promise<void> {
        const mainList = this.page.locator('section');
        const itemElement = mainList.locator(`li:has-text("${item}")`);
        const checkbox = itemElement.locator('input[type="checkbox"]');
        await expect(checkbox).toBeChecked();
    }

    /** Expect item to be checked in the Step 2 list */
    async expectItemCheckedInStep2List(item: string): Promise<void> {
        const step2Section = this.page.locator('section').nth(1);
        const itemElement = step2Section.locator(`li:has-text("${item}")`);
        const checkbox = itemElement.locator('input[type="checkbox"]');
        await expect(checkbox).toBeChecked();
    }

    /** Filter to show only completed items */
    async filterCompletedItem(): Promise<void> {
        const completedFilter = this.page.locator('ul.filters a.filterCompleted');
        await completedFilter.waitFor({ state: 'visible' });
        await completedFilter.click();

        await this.page.waitForTimeout(500);
    }

    /** Expect only specific items to be visible in the main list */
    async expectOnlyItemInMainList(items: string[]): Promise<void> {
        const mainList = this.page.locator('section').first();
        const visibleItems = mainList.locator('ul.todo-list > li:visible');

        if (items.length === 0) {
            await expect(visibleItems).toHaveCount(0);
        } else {
            await expect(visibleItems).toHaveCount(items.length);

            for (const item of items) {
                const itemElement = mainList.locator(`li:has-text("${item}")`);
                await expect(itemElement).toBeVisible();
            }
        }
    }

    /** Expect only specific items to be visible in the Step 2 list */
    async expectOnlyItemInStep2List(items: string[]): Promise<void> {
        const step2Section = this.page.locator('section').nth(1);
        const visibleItems = step2Section.locator('ul li:visible');

        if (items.length === 0) {
            await expect(visibleItems).toHaveCount(0);
        } else {
            await expect(visibleItems).toHaveCount(items.length);

            for (const item of items) {
                const itemElement = step2Section.locator(`li:has-text("${item}")`);
                await expect(itemElement).toBeVisible();
            }
        }
    }

    /** Filter to show only active items */
    async filterActiveItem(): Promise<void> {
        const activeFilter = this.page.locator('ul.filters a.filterActives');
        await activeFilter.waitFor({ state: 'visible' });
        await activeFilter.click();

        await this.page.waitForTimeout(500);
    }

    /** Click the Undo button */
    async clickUndo(): Promise<void> {
        const undoButton = this.page.locator('button:has-text("Annuler")').first();
        await undoButton.click();

        await this.page.waitForTimeout(300);
    }

    /** Click the Redo button */
    async clickRedo(): Promise<void> {
        const redoButton = this.page.locator('button:has-text("Refaire")').first();
        await redoButton.click();

        await this.page.waitForTimeout(300);
    }
}