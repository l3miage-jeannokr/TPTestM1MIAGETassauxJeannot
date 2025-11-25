abstract class fonctionTest {

    abstract displayListeEmpty(): []

    abstract footerDisplay(boolean: boolean)

    abstract addItem (item: string)

    abstract displayListeIs( event : Evenement[] )

    abstract goto()

    abstract expectItemInMainList ( item : string )

    abstract expectItemNotInMainList ( item : string )

    abstract expectItemInStep2List ( item : string )

    abstract expectItemNotInStep2List ( item : string )

    abstract deleteItem ( item : string )

    abstract editItem ( oldItem : string , newItem : string )

    abstract checkItem ( item : string )
    
    abstract expectItemCheckedInMainList ( item : string )

    abstract expectItemCheckedInStep2List ( item : string )

    abstract filterCompletedItem()

    abstract expectOnlyItemInMainList ( item : string )

    abstract expectOnlyItemInStep2List ( item : string )

    abstract filterActiveItem()

    abstract clickUndo()

    abstract clickUndo()

  
}