export default function(shoppingList, name, quantity, category) {
    for(item of shoppingList){
        if(item.name == name){
            item.quantity = quantity
            item.category = category;
        }
    }
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
}
