export default function(shoppingList, name, quantity, category) {
    shoppingList.push({name: name, quantity: quantity, category: category});
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}
