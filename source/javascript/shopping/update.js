export default function(shoppingList, name, quantity, category) {
    for(item of shoppingList){ //Looping object in shoppingList and assign it to item
        if(item.name == name){ //If item's name is match with the name that user want to update
            item.quantity = quantity//Chnage the quantity base on user's request
            item.category = category;//Chnage the category base on user's request
        }
    }
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))//push the shoppingList back to localStorage
}
