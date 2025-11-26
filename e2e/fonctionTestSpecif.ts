import { Page } from '@playwright/test';
import { Evenement } from './fonctionTest';

export abstract class fonctionTestSpecif {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /** Fonction qui navigue vers la page de la TodoList.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract goto(): Promise<void>;

    /** Fonction qui supprime tous les items de la TodoList.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract clearAllItems(): Promise<void>;

    /** Fonction qui vérifie que la liste affichée est vide.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract displayListeEmpty(): Promise<void>;

    /** Fonction qui vérifie si le footer est affiché ou non selon le paramètre isDisplayed.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract footerDisplay(isDisplayed: boolean): Promise<void>;

    /** Fonction qui ajoute un item (une ligne dans la TodoList) dont le nom est celui en paramètre.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract addItem(item: string): Promise<void>;

    /** Fonction qui vérifie que la liste affichée correspond aux événements attendus passés en paramètre.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract displayListeIs(events: Evenement[]): Promise<void>;

    /** Fonction qui vérifie qu'un item est visible dans la liste principale.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract expectItemInMainList(item: string): Promise<void>;

    /** Fonction qui vérifie qu'un item n'est PAS visible dans la liste principale.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract expectItemNotInMainList(item: string): Promise<void>;

    /** Fonction qui vérifie qu'un item est visible dans la liste de l'Étape 2.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract expectItemInStep2List(item: string): Promise<void>;

    /** Fonction qui vérifie qu'un item n'est PAS visible dans la liste de l'Étape 2.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract expectItemNotInStep2List(item: string): Promise<void>;

    /** Fonction qui supprime un item de la TodoList dont le nom est passé en paramètre.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract deleteItem(item: string): Promise<void>;

    /** Fonction qui modifie un item existant (oldItem) avec une nouvelle valeur (newItem).
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract editItem(oldItem: string, newItem: string): Promise<void>;

    /** Fonction qui coche/complète un item dans la TodoList.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract checkItem(item: string): Promise<void>;

    /** Fonction qui vérifie qu'un item est coché dans la liste principale.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract expectItemCheckedInMainList(item: string): Promise<void>;

    /** Fonction qui vérifie qu'un item est coché dans la liste de l'Étape 2.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract expectItemCheckedInStep2List(item: string): Promise<void>;

    /** Fonction qui applique le filtre pour afficher uniquement les items complétés.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract filterCompletedItem(): Promise<void>;

    /** Fonction qui vérifie que seuls les items spécifiques sont visibles dans la liste principale.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract expectOnlyItemInMainList(items: string[]): Promise<void>;

    /** Fonction qui vérifie que seuls les items spécifiques sont visibles dans la liste de l'Étape 2.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract expectOnlyItemInStep2List(items: string[]): Promise<void>;

    /** Fonction qui applique le filtre pour afficher uniquement les items actifs.
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract filterActiveItem(): Promise<void>;

    /** Fonction qui clique sur le bouton Annuler (Undo).
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract clickUndo(): Promise<void>;

    /** Fonction qui clique sur le bouton Refaire (Redo).
     * renvoie une promesse vide quand le processus est terminé afin de garantir l'execution successive 
    */
    abstract clickRedo(): Promise<void>;
}
