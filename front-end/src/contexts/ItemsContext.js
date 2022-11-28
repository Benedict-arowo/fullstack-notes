import React, { createContext, useContext, useState } from 'react'

const ItemsProvider = createContext()
const setItemsProvider = createContext()

export const useItems = () => useContext(ItemsProvider)
export const useSetItems = () => useContext(setItemsProvider)

const ItemsContext = ({ children }) => {
    const [items, setItems] = useState()

    const updateItems = (newItems) => {
        setItems(newItems)
    }

    return (
        <ItemsProvider.Provider value={items}>
            <setItemsProvider.Provider value={updateItems}>
                {children}
            </setItemsProvider.Provider>
        </ItemsProvider.Provider>
    )
}

export default ItemsContext