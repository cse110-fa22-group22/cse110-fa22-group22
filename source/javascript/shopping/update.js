/**
 * Update item in the shopping list and update localStorage.
 * @param {*} shoppingList array of existing inventory items
 * @param {*} prevName name of the to be update item
 * @param {*} name name of update item
 * @param {*} quantity quantity of the update item
 * @param {*} category category of update item
 * @returns true if the item is successfully updated, return false otherwise
 */
export default function (shoppingList, prevName, name, quantity, category) {
    if (prevName.toLowerCase() !== name.toLowerCase()) {
        for (const item of shoppingList) {
            if (item.name.toLowerCase() === name.toLowerCase()) {
                return false
            }
        }
    }
    for (const item of shoppingList) { // Looping object in shoppingList and assign it to item
        if (item.name === prevName) { // If item's name is match with the name that user want to update
            item.name = name // Change name
            item.quantity = quantity// Chnage the quantity base on user's request
            item.category = category// Chnage the category base on user's request
        }
    }
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList)) // push the shoppingList back to localStorage
    return true
}
