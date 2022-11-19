import create from './shopping/create.js'
import update from './shopping/update.js'
import remove from './shopping/delete.js' // delete is a keyword

const shoppingList = []
const inventoryList = {}
const client = {}

client.shopping = {
    create,
    update,
    delete: remove
}
