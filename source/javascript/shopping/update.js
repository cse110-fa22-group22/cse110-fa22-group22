export default function (shoppingList, prevName, name, quantity, category) {
    if (prevName !== name) {
        for (const item of shoppingList) {
            if (item.name === name) {
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
}
