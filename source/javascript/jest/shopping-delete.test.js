import create from '../shopping/create.js'
import delItem from '../shopping/delete.js'
//const create = require('../shopping/create.js')
//const delItem = require('../shopping/delete.js')

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock;

test('Delete 1 item', () => {
    // shoppingList, name, quantity, category
    let shoppingList = []
    let name1 = 'Apple'
    let quantity1 = '1'
    let category1 = 'Fruit'
    create(shoppingList, name1, quantity1, category1)
    let name2 = 'Beer'
    let quantity2 = '3'
    let category2 = 'Beverage'
    create(shoppingList, name2, quantity2, category2)
    delItem(shoppingList, name1)
    expect(shoppingList.length).toBe(1)
    expect(shoppingList[0].name).toBe('Beer')
    expect(shoppingList[0].quantity).toBe('3')
    expect(shoppingList[0].category).toBe('Beverage')
})