import { Evenement } from './EvenementType';

export abstract class fonctionTest {

    /** Check if the displayed list is empty */
    abstract displayListeEmpty(): Promise<void>

    /** Verify if footer is displayed or not */
    abstract footerDisplay(isDisplayed: boolean): Promise<void>

    /** Add a new item to the todo list */
    abstract addItem(item: string): Promise<void>

    /** Verify the displayed list matches the expected events */
    abstract displayListeIs(events: Evenement[]): Promise<void>

    /** Navigate to the todo list page */
    abstract goto(): Promise<void>

    /** Expect item to be visible in the main list */
    abstract expectItemInMainList(item: string): Promise<void>

    /** Expect item to NOT be visible in the main list */
    abstract expectItemNotInMainList(item: string): Promise<void>

    /** Expect item to be visible in the Step 2 list */
    abstract expectItemInStep2List(item: string): Promise<void>

    /** Expect item to NOT be visible in the Step 2 list */
    abstract expectItemNotInStep2List(item: string): Promise<void>

    /** Delete an item from the todo list */
    abstract deleteItem(item: string): Promise<void>

    /** Edit an existing item with a new value */
    abstract editItem(oldItem: string, newItem: string): Promise<void>

    /** Check/complete an item in the todo list */
    abstract checkItem(item: string): Promise<void>

    /** Expect item to be checked in the main list */
    abstract expectItemCheckedInMainList(item: string): Promise<void>

    /** Expect item to be checked in the Step 2 list */
    abstract expectItemCheckedInStep2List(item: string): Promise<void>

    /** Filter to show only completed items */
    abstract filterCompletedItem(): Promise<void>

    /** Expect only specific items to be visible in the main list */
    abstract expectOnlyItemInMainList(items: string[]): Promise<void>

    /** Expect only specific items to be visible in the Step 2 list */
    abstract expectOnlyItemInStep2List(items: string[]): Promise<void>

    /** Filter to show only active items */
    abstract filterActiveItem(): Promise<void>

    /** Click the Undo button */
    abstract clickUndo(): Promise<void>

    /** Click the Redo button */
    abstract clickRedo(): Promise<void>

}