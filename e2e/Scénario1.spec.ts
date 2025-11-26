import { test, expect } from '@playwright/test';
import { fonctionTest } from './fonctionTest';

// test initial
test('page loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
});
test.beforeEach(async ({ page }) => {
    const todoListPage = new fonctionTest(page);
    await todoListPage.goto();
    await todoListPage.clearAllItems();
});
// Test A
test.describe("Scénario nominal 3add", () => {
    test("ajout de 3 tâches différentes puis complétion successive puis suppression successive", async ({ page }) => {
        const todoListPage = new fonctionTest(page);

        await todoListPage.goto();

        await todoListPage.displayListeEmpty();

        await todoListPage.footerDisplay(false);

        await todoListPage.addItem("révision P&C");
        await todoListPage.footerDisplay(true);
        await todoListPage.displayListeIs([
            { checked: false, label: "révision P&C" }
        ]);

        await todoListPage.addItem("révision Système");
        await todoListPage.footerDisplay(true);
        await todoListPage.displayListeIs([
            { checked: false, label: "révision P&C" },
            { checked: false, label: "révision Système" }
        ]);

        await todoListPage.addItem("TP IHM");
        await todoListPage.footerDisplay(true);
        await todoListPage.displayListeIs([
            { checked: false, label: "révision P&C" },
            { checked: false, label: "révision Système" },
            { checked: false, label: "TP IHM" }
        ]);

        await todoListPage.checkItem("révision P&C");
        await todoListPage.displayListeIs([
            { checked: true, label: "révision P&C" },
            { checked: false, label: "révision Système" },
            { checked: false, label: "TP IHM" }
        ]);

        await todoListPage.checkItem("révision Système");
        await todoListPage.displayListeIs([
            { checked: true, label: "révision P&C" },
            { checked: true, label: "révision Système" },
            { checked: false, label: "TP IHM" }
        ]);

        await todoListPage.checkItem("TP IHM");
        await todoListPage.displayListeIs([
            { checked: true, label: "révision P&C" },
            { checked: true, label: "révision Système" },
            { checked: true, label: "TP IHM" }
        ]);

        await todoListPage.deleteItem("révision P&C");
        await todoListPage.displayListeIs([
            { checked: true, label: "révision Système" },
            { checked: true, label: "TP IHM" }
        ]);

        await todoListPage.deleteItem("révision Système");
        await todoListPage.displayListeIs([
            { checked: true, label: "TP IHM" }
        ]);

        await todoListPage.deleteItem("TP IHM");
        await todoListPage.displayListeEmpty();
    });
});


//        1) Ajouter une tâche ( voir que la tâche à était ajouté dans la liste et dans l'étape 2)
test.describe("Ajouter une tâche est virifiée dans la liste et dans l'étape 2", () => {
    test('La tâche ajoutée est visible dans la liste principale et la liste de l\'Étape 2', async ({ page }) => {

        const todoListPage = new fonctionTest(page);
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

        const todoListPage = new fonctionTest(page);
        const uniqueItemName = `Tâche à supprimer `;

        await todoListPage.goto();

        await todoListPage.addItem(uniqueItemName);

        await todoListPage.expectItemInMainList(uniqueItemName);
        await todoListPage.expectItemInStep2List(uniqueItemName);

        await todoListPage.deleteItem(uniqueItemName);
        await todoListPage.expectItemNotInMainList(uniqueItemName);
        await todoListPage.expectItemNotInStep2List(uniqueItemName);
    })
});


//        3) Modifier une tâche ( voir que la tâche à était Modifier dans la liste et dans l'étape 2)

test.describe("Modifier une tâche est virifiée dans la liste et dans l'étape 2", () => {
    test('La tâche modifiée est visible dans la liste principale et la liste de l Étape 2', async ({ page }) => {
        const todoListPage = new fonctionTest(page);
        const uniqueItemName = `Tâche à Modifier `;

        await todoListPage.goto();

        await todoListPage.addItem(uniqueItemName);
        await todoListPage.expectItemInMainList(uniqueItemName);
        await todoListPage.expectItemInStep2List(uniqueItemName);
        const modifiedTaskName = `${uniqueItemName} - Modifiée`;
        await todoListPage.editItem(uniqueItemName, modifiedTaskName);
        await todoListPage.expectItemInMainList(modifiedTaskName);
        await todoListPage.expectItemInStep2List(modifiedTaskName);
    })
});



//        4) Modifier une tâche par l'élément vide ( voir que la tâche à était supprimé aprés validation dans la liste et dans l'étape 2)
test.describe("Modifier une tâche par l'élément vide est virifiée dans la liste et dans l'étape 2", () => {
    test('La tâche modifiée par élément vide est supprimée dans la liste principale et la liste de l Étape 2', async ({ page }) => {
        const todoListPage = new fonctionTest(page);
        const uniqueItemName = `Tâche à Modifier `;

        await todoListPage.goto();

        await todoListPage.addItem(uniqueItemName);
        await todoListPage.expectItemInMainList(uniqueItemName);
        await todoListPage.expectItemInStep2List(uniqueItemName);
        const modifiedTaskName = ``;
        await todoListPage.editItem(uniqueItemName, modifiedTaskName);
        await todoListPage.expectItemNotInMainList(uniqueItemName);
        await todoListPage.expectItemNotInStep2List(uniqueItemName);
    })
});


//        5) Ajouter une tâche vide ( voir que la tâche à était ajouté dans la liste et dans l'étape 2)

test.describe("Ajouter une tâche vide est vérifiée dans la liste et dans l'étape 2", () => {
    test('La tâche vide ajoutée est visible dans la liste principale et dans l Étape 2', async ({ page }) => {
        const todoListPage = new fonctionTest(page);
        const uniqueItemName = ``; // Tâche vide

        await todoListPage.goto();

        await todoListPage.addItem(uniqueItemName);

        await todoListPage.expectItemInMainList(uniqueItemName);

        await todoListPage.expectItemInStep2List(uniqueItemName);
    });
});

//        6) Sélectionner une tâche 
test.describe("Sélectionner une tâche", () => {
    test('La tâche sélectionnée est cochée dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new fonctionTest(page);
        const uniqueItemName = `Tâche à sélectionner `;

        await todoListPage.goto();

        await todoListPage.addItem(uniqueItemName);

        await todoListPage.expectItemInMainList(uniqueItemName);
        await todoListPage.expectItemInStep2List(uniqueItemName);

        await todoListPage.checkItem(uniqueItemName);
        await todoListPage.expectItemCheckedInMainList(uniqueItemName);
        await todoListPage.expectItemCheckedInStep2List(uniqueItemName);
    })
});


//        7) Sélectionner plusieurs tâches

test.describe("Sélectionner plusieurs tâches", () => {
    test('Les tâches sélectionnées sont cochées dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new fonctionTest(page);
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
    })
});


//        8) filtrer par tâche complétés(avec 1 tâche sur 3 complété) 
test.describe("Filtrer par tâche complétée (1 sur 3)", () => {
    test('Filtrer affiche uniquement la tâche complétée dans la liste principale et la liste de l Étape 2', async ({ page }) => {
        const todoListPage = new fonctionTest(page);
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

        await todoListPage.expectItemCheckedInMainList(itemNames[0]);

        await todoListPage.filterCompletedItem();

        await todoListPage.expectOnlyItemInMainList([itemNames[0]]);

        await todoListPage.expectOnlyItemInStep2List([itemNames[0]]);
    });
});

//        9) filtrer par tâche complété(avec 0 tâche sur 3 complété) 

test.describe("Filtrer par tâche complétée (0 sur 3)", () => {
    test('Filtrer affiche aucune tâche dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new fonctionTest(page);
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
    })
});

//        10) filtrer par tâche complété(avec 3 tâche sur 3 complété) 

test.describe("Filtrer par tâche complétée (3 sur 3)", () => {
    test('Filtrer affiche toutes les tâches dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new fonctionTest(page);
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
            await todoListPage.expectItemCheckedInMainList(name);
        }

        await todoListPage.filterCompletedItem();

        await todoListPage.expectOnlyItemInMainList(itemNames);

        await todoListPage.expectOnlyItemInStep2List(itemNames);
    });
});

//        11) filtrer par tâche active (avec 1 tâche sur 3 actif) 

test.describe("Filtrer par tâche active (1 sur 3)", () => {
    test('Filtrer affiche uniquement les tâches actives dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new fonctionTest(page);
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
        await todoListPage.expectItemCheckedInMainList(itemNames[1]);

        await todoListPage.checkItem(itemNames[2]);
        await todoListPage.expectItemCheckedInMainList(itemNames[2]);

        await todoListPage.filterActiveItem();

        await todoListPage.expectOnlyItemInMainList([itemNames[0]]);
        await todoListPage.expectOnlyItemInStep2List([itemNames[0]]);
    })
});

//        12) filtrer par tâche active (avec 0 tâche sur 3 actif) 
test.describe("Filtrer par tâche active (0 sur 3)", () => {
    test('Filtrer affiche aucune tâche dans la liste principale et la liste de l Étape 2', async ({ page }) => {
        const todoListPage = new fonctionTest(page);
        const itemNames = [`Tâche 1`, `Tâche 2`, `Tâche 3`];

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

        for (const name of itemNames) {
            await todoListPage.expectItemNotInMainList(name);
            await todoListPage.expectItemNotInStep2List(name);
        }
    });
});
//        13) filtrer par tâche active (avec 3 tâche sur 3 actif) 
test.describe("Filtrer par tâche active (3 sur 3)", () => {
    test('Filtrer affiche toutes les tâches dans la liste principale', async ({ page }) => {

        const todoListPage = new fonctionTest(page);
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
    })
});
//        14) Supprimer plusieurs tâches par sélection ( voir que les tâches on était supprimé dans la liste et dans l'étape 2)
test.describe("Supprimer plusieurs tâches par sélection est virifiée dans la liste et dans l'étape 2", () => {
    test('Les tâches supprimées ne sont plus visibles dans la liste principale et la liste de l Étape 2', async ({ page }) => {

        const todoListPage = new fonctionTest(page);
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
    })
});

//        15) Annuler :  retire la dernière tâche ajoutée, et Refaire la restaure

test.describe("Fonctionnalité Annuler/Refaire", () => {

    test('Annuler retire la dernière tâche ajoutée, et Refaire la restaure', async ({ page }) => {

        const todoListPage = new fonctionTest(page);
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
