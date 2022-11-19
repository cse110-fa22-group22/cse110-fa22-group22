import create from './shopping/create.js'
import update from './shopping/update.js'
import remove from './shopping/delete.js' // delete is a keyword
import test from './shopping/sum.js'

const shoppingList = []
const inventoryList = {}
const client = {}
const client = {
    shopList: [],
    invList: {}
}

client.shopping = {
    create,
    update,
    delete: remove,
    test
}

client.shopping.test('hello')
