export default function (shoppingList, name, quantity, category) {
    shoppingList.push({ name, quantity, category })
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
}
