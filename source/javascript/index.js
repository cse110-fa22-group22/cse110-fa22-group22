import create from './shopping/create.js'
import update from './shopping/update.js'
import remove from './shopping/delete.js' // delete is a keyword

const shoppingList = []
// const inventoryList = {}
const client = {}

client.shopping = {
    create,
    update,
    delete: remove
}

function readItemFromStorage () {
    const shoppingListFromStorage = JSON.parse(localStorage.getItem('shoppingList'))
    const list = document.getElementById('shopping_list')
    if (shoppingListFromStorage != null) {
        for (const item of shoppingListFromStorage) {
            list.innerHTML += `
    <li>
        <input type="checkbox">
        <span>${item.name}</span> | <span>quantity: ${item.quantity}</span> | <span>${item.category} </span><span><button class = 'update'>update</button></span>
        <span>X</span>
    </li>
    `
            shoppingList.push({ name: item.name, quantity: item.quantity, category: item.category })
        }
    }
}
