import { test, expect } from '@playwright/test';
import { describe, it } from 'node:test';
import { TodoListPage } from './TodoListPage';

//Base des tests à venir (en plus de vérif que la page est bien chargée) made in AI

test('page loads successfully', async ({ page }) => {
    await page.goto('/l3m-2023-2024-angular-todolist');

    await expect(page.locator('body')).toBeVisible();
});

// Helper functions for scenario tests
let todoListPage: TodoListPage;

async function displayedListEmpty() {
    await todoListPage.displayListeEmpty();
}

async function footerDisplayed(isDisplayed: boolean) {
    await todoListPage.footerDisplay(isDisplayed);
}

async function addItem(item: string) {
    await todoListPage.addItem(item);
}

async function displayedListIs(events: { checked: boolean; label: string }[]) {
    await todoListPage.displayListeIs(events);
}

test.describe("Scénario nominal 3add", () => {
    test("ajout de 3 taches différentes puis complétion successive puis remove succesif", async ({ page }) => {
        todoListPage = new TodoListPage(page);
        await todoListPage.goto();

        await displayedListEmpty()
        await footerDisplayed(false)
        await addItem("révision P&C")
        await footerDisplayed(true)
        await displayedListIs([
            { checked: false, label: "révision P&C" }])
        await addItem("révision Système")
        await footerDisplayed(true)
        await displayedListIs([
            { checked: false, label: "révision P&C" },
            { checked: false, label: "révision Système" }])
        await addItem("TP IHM")
        await footerDisplayed(true)
        await displayedListIs([
            { checked: false, label: "révision P&C" },
            { checked: false, label: "révision Système" },
            { checked: false, label: "TP IHM" }])
    });
});


//        1) Ajouter une tâche ( voir que la tâche à était ajouté dans la liste et dans l'étape 2)
test.describe("Ajouter une tâche est virifiée dans la liste et dans l'étape 2", () => {
    test('La tâche ajoutée est visible dans la liste principale et la liste de l\'Étape 2', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const uniqueItemName = `Nouvelle tâche`;
        await todoListPage.goto();
        await todoListPage.addItem(uniqueItemName);
        await todoListPage.expectItemInMainList(uniqueItemName);
        await todoListPage.expectItemInStep2List(uniqueItemName);

    });
});


//        2) Supprimer une tâche ( voir que la tâche à était supprimé dans la liste et dans l'étape 2)

test.describe("Supprimer une tâche est virifiée dans la liste et dans l'étape 2", () => {
    test('La tâche supprimée est plus visible dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const uniqueItemName = `Tâche à supprimer `;

        await todoListPage.goto();

        await todoListPage.addItem(uniqueItemName);

        await todoListPage.expectItemInMainList(uniqueItemName);
        await todoListPage.expectItemInStep2List(uniqueItemName);

        await todoListPage.deleteItem(uniqueItemName);
        await todoListPage.expectItemNotInMainList(uniqueItemName);
        await todoListPage.expectItemNotInStep2List(uniqueItemName);
    });
});


//        3) Modifier une tâche ( voir que la tâche à était Modifier dans la liste et dans l'étape 2)

test.describe("Modifier une tâche est virifiée dans la liste et dans l'étape 2", () => {
    test('La tâche modifiée est visible dans la liste principale et la liste de l Étape 2', async ({ page }) => {
        const todoListPage = new TodoListPage(page);
        const uniqueItemName = `Tâche à Modifier `;

        await todoListPage.goto();

        await todoListPage.addItem(uniqueItemName);
        await todoListPage.expectItemInMainList(uniqueItemName);
        await todoListPage.expectItemInStep2List(uniqueItemName);
        const modifiedTaskName = `${uniqueItemName} - Modifiée`;
        await todoListPage.editItem(uniqueItemName, modifiedTaskName);
        await todoListPage.expectItemInMainList(modifiedTaskName);
        await todoListPage.expectItemInStep2List(modifiedTaskName);
    });
});



//        4) Modifier une tâche par l'élément vide ( voir que la tâche à était supprimé aprés validation dans la liste et dans l'étape 2)
test.describe("Modifier une tâche par l'élément vide est virifiée dans la liste et dans l'étape 2", () => {
    test('La tâche modifiée par élément vide est supprimée dans la liste principale et la liste de l Étape 2', async ({ page }) => {
        const todoListPage = new TodoListPage(page);
        const uniqueItemName = `Tâche à Modifier `;

        await todoListPage.goto();

        await todoListPage.addItem(uniqueItemName);
        await todoListPage.expectItemInMainList(uniqueItemName);
        await todoListPage.expectItemInStep2List(uniqueItemName);
        const modifiedTaskName = ``;
        await todoListPage.editItem(uniqueItemName, modifiedTaskName);
        await todoListPage.expectItemNotInMainList(uniqueItemName);
        await todoListPage.expectItemNotInStep2List(uniqueItemName);
    });
});


//        5) Ajouter une tâche vide ( voir que la tâche à était ajouté dans la liste et dans l'étape 2)

test.describe("Ajouter une tâche vide est virifiée dans la liste et dans l'étape 2", () => {
    test('La tâche vide ajoutée n est pas visible dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const uniqueItemName = ``;

        await todoListPage.goto();

        await todoListPage.addItem(uniqueItemName);

        await todoListPage.expectItemNotInMainList(uniqueItemName);

        await todoListPage.expectItemNotInStep2List(uniqueItemName);

    });
});

//        6) Sélectionner une tâche 
test.describe("Sélectionner une tâche", () => {
    test('La tâche sélectionnée est cochée dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const uniqueItemName = `Tâche à sélectionner `;

        await todoListPage.goto();

        await todoListPage.addItem(uniqueItemName);

        await todoListPage.expectItemInMainList(uniqueItemName);
        await todoListPage.expectItemInStep2List(uniqueItemName);

        await todoListPage.checkItem(uniqueItemName);
        await todoListPage.expectItemCheckedInMainList(uniqueItemName);
        await todoListPage.expectItemCheckedInStep2List(uniqueItemName);
    });
});


//        7) Sélectionner plusieurs tâches

test.describe("Sélectionner plusieurs tâches", () => {
    test('Les tâches sélectionnées sont cochées dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const itemNames = [
            `Tâche à sélectionner 1 `,
            `Tâche à sélectionner 2 `,
            `Tâche à sélectionner 3 `
        ];

        await todoListPage.goto();

        for (const name of itemNames) {
            await todoListPage.addItem(name);
            await todoListPage.expectItemInMainList(name);
            await todoListPage.expectItemInStep2List(name);
        }

        for (const name of itemNames) {
            await todoListPage.checkItem(name);
            await todoListPage.expectItemCheckedInMainList(name);
            await todoListPage.expectItemCheckedInStep2List(name);
        }
    });
});


//        8) filtrer par tâche complétés(avec 1 tâche sur 3 complété) 
test.describe("Filtrer par tâche complétée (1 sur 3)", () => {
    test('Filtrer affiche uniquement la tâche complétée dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const itemNames = [
            `Tâche 1 `,
            `Tâche 2 `,
            `Tâche 3 `
        ];

        await todoListPage.goto();

        for (const name of itemNames) {
            await todoListPage.addItem(name);
            await todoListPage.expectItemInMainList(name);
            await todoListPage.expectItemInStep2List(name);
        }

        await todoListPage.checkItem(itemNames[0]);

        await todoListPage.filterCompletedItem();

        await todoListPage.expectOnlyItemInMainList([itemNames[0]]);
        await todoListPage.expectOnlyItemInStep2List([itemNames[0]]);
    });
});

//        9) filtrer par tâche complété(avec 0 tâche sur 3 complété) 

test.describe("Filtrer par tâche complétée (0 sur 3)", () => {
    test('Filtrer affiche aucune tâche dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const itemNames = [
            `Tâche 1 `,
            `Tâche 2 `,
            `Tâche 3 `
        ];

        await todoListPage.goto();

        for (const name of itemNames) {
            await todoListPage.addItem(name);
            await todoListPage.expectItemInMainList(name);
            await todoListPage.expectItemInStep2List(name);
        }

        await todoListPage.filterCompletedItem();

        await todoListPage.expectOnlyItemInMainList([]);
        await todoListPage.expectOnlyItemInStep2List([]);
    });
});

//        10) filtrer par tâche complété(avec 3 tâche sur 3 complété) 

test.describe("Filtrer par tâche complétée (3 sur 3)", () => {
    test('Filtrer affiche toutes les tâches dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const itemNames = [
            `Tâche 1 `,
            `Tâche 2 `,
            `Tâche 3 `
        ];

        await todoListPage.goto();

        for (const name of itemNames) {
            await todoListPage.addItem(name);
            await todoListPage.expectItemInMainList(name);
            await todoListPage.expectItemInStep2List(name);
        }

        for (const name of itemNames) {
            await todoListPage.checkItem(name);
        }

        await todoListPage.filterCompletedItem();

        await todoListPage.expectOnlyItemInMainList(itemNames);
        await todoListPage.expectOnlyItemInStep2List(itemNames);
    });
});

//        11) filtrer par tâche active (avec 1 tâche sur 3 actif) 

test.describe("Filtrer par tâche active (1 sur 3)", () => {
    test('Filtrer affiche uniquement les tâches actives dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const itemNames = [
            `Tâche 1 `,
            `Tâche 2 `,
            `Tâche 3 `
        ];

        await todoListPage.goto();

        for (const name of itemNames) {
            await todoListPage.addItem(name);
            await todoListPage.expectItemInMainList(name);
            await todoListPage.expectItemInStep2List(name);
        }

        await todoListPage.checkItem(itemNames[1]);
        await todoListPage.checkItem(itemNames[2]);

        await todoListPage.filterActiveItem();

        await todoListPage.expectOnlyItemInMainList([itemNames[0]]);
        await todoListPage.expectOnlyItemInStep2List([itemNames[0]]);
    });
});

//        12) filtrer par tâche active (avec 0 tâche sur 3 actif) 
test.describe("Filtrer par tâche active (0 sur 3)", () => {
    test('Filtrer affiche aucune tâche dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const itemNames = [
            `Tâche 1 `,
            `Tâche 2 `,
            `Tâche 3 `
        ];

        await todoListPage.goto();

        for (const name of itemNames) {
            await todoListPage.addItem(name);
            await todoListPage.expectItemInMainList(name);
            await todoListPage.expectItemInStep2List(name);
        }

        for (const name of itemNames) {
            await todoListPage.checkItem(name);
        }

        await todoListPage.filterActiveItem();

        await todoListPage.expectOnlyItemInMainList([]);
        await todoListPage.expectOnlyItemInStep2List([]);
    });
});
//        13) filtrer par tâche active (avec 3 tâche sur 3 actif) 
test.describe("Filtrer par tâche active (3 sur 3)", () => {
    test('Filtrer affiche toutes les tâches dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const itemNames = [
            `Tâche 1 `,
            `Tâche 2 `,
            `Tâche 3 `
        ];

        await todoListPage.goto();

        for (const name of itemNames) {
            await todoListPage.addItem(name);
            await todoListPage.expectItemInMainList(name);
            await todoListPage.expectItemInStep2List(name);
        }

        await todoListPage.filterActiveItem();

        await todoListPage.expectOnlyItemInMainList(itemNames);
        await todoListPage.expectOnlyItemInStep2List(itemNames);
    });
});
//        14) Supprimer plusieurs tâches par sélection ( voir que les tâches on était supprimé dans la liste et dans l'étape 2)
test.describe("Supprimer plusieurs tâches par sélection est virifiée dans la liste et dans l'étape 2", () => {
    test('Les tâches supprimées ne sont plus visibles dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const itemNames = [
            `Tâche à supprimer 1 `,
            `Tâche à supprimer 2 `,
            `Tâche à supprimer 3 `
        ];

        await todoListPage.goto();

        for (const name of itemNames) {
            await todoListPage.addItem(name);
            await todoListPage.expectItemInMainList(name);
            await todoListPage.expectItemInStep2List(name);
        }

        for (const name of itemNames) {
            await todoListPage.deleteItem(name);
            await todoListPage.expectItemNotInMainList(name);
            await todoListPage.expectItemNotInStep2List(name);
        }
    });
});

//        15) Annuler :  retire la dernière tâche ajoutée, et Refaire la restaure

test.describe("Fonctionnalité Annuler/Refaire", () => {

    test('Annuler retire la dernière tâche ajoutée, et Refaire la restaure', async ({ page }) => {

        const todoListPage = new TodoListPage(page);
        const uniqueItemName = `Tâche à annuler - ${Date.now()}`;

        await todoListPage.goto();

        await todoListPage.addItem(uniqueItemName);

        await todoListPage.expectItemInMainList(uniqueItemName);


        await todoListPage.clickUndo();


        await todoListPage.expectItemNotInMainList(uniqueItemName);
        console.log(`Annulation (Undo) réussie.`);


        await todoListPage.clickRedo();

        await todoListPage.expectItemInMainList(uniqueItemName);
        console.log(`Restauration (Redo) réussie.`);
    });
});
