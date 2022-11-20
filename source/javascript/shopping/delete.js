export default function (shopping, name) {
    for(var i = 0; i < shopping.length; i++) {
        if(shopping[i].name === name){
            shopping.splice(i, 1);
            localStorage.setItem('shoppingList', JSON.stringify(shopping));
            return;
        }
    }
}