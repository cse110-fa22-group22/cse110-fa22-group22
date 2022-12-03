/**
 * Add new item to existing shopping list and update localStorage
 * @param {*} shoppingList array of existing shopping items
 * @param {*} name name of new item
 * @param {*} quantity quantity of new item
 * @param {*} category category of new item
 * @returns false if there exist item with same name in shopping list, true otherwise
 */
export default function (shoppingList, name, quantity, category) {
    for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i].name.toLowerCase() === name.toLowerCase()) {
            return false
        }
    }

    shoppingList.push({ name, quantity, category })
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
    return true
}
