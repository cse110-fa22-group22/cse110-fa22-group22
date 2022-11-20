export default function (shoppingList, name, quantity, category) {
    for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i].name === name) {
            return false
        }
    }

    shoppingList.push({ name, quantity, category })
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
    return true
}
