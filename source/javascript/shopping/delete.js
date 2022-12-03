/**
 * Deletes the item matching name from shopping and updates local storage
 * @param {*} shopping array of the items on the current shopping list
 * @param {*} name the name of the item to be removed from the shopping
 * @returns n/a
 */
export default function (shopping, name) {
    for (let i = 0; i < shopping.length; i++) {
        if (shopping[i].name.toLowerCase() === name.toLowerCase()) {
            shopping.splice(i, 1)
            localStorage.setItem('shoppingList', JSON.stringify(shopping))
            return
        }
    }
}
