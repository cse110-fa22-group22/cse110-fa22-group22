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
    let category2 = 'Drinks'
    create(shoppingList, name2, quantity2, category2)
    delItem(shoppingList, name1)
    expect(shoppingList.length).toBe(1)
    expect(shoppingList[0].name).toBe('Beer')
    expect(shoppingList[0].quantity).toBe('3')
    expect(shoppingList[0].category).toBe('Drinks')
})

test('Delete item thats not in list', () => {
    // shoppingList, name, quantity, category
    let shoppingList = []
    create(shoppingList, 'Apple', '1', 'Fruit')
    create(shoppingList, 'Beer', '3', 'Drinks')
    create(shoppingList, 'Water', '10', 'Drinks')
    
    delItem(shoppingList, 'Chicken')
    expect(shoppingList.length).toBe(3)
})

test('Delete items in the list', () => {
    // shoppingList, name, quantity, category
    let shoppingList = []
    create(shoppingList, 'Apple', '1', 'Fruit')
    create(shoppingList, 'Beer', '3', 'Drinks')
    create(shoppingList, 'Water', '10', 'Drinks')
    expect(shoppingList.length).toBe(3)
    delItem(shoppingList, 'Beer')
    expect(shoppingList.length).toBe(2)
    delItem(shoppingList, 'Water')
    expect(shoppingList.length).toBe(1)
    delItem(shoppingList, 'Apple')
    expect(shoppingList.length).toBe(0)
})

test('Delete item on empty list', () => {
    // shoppingList, name, quantity, category
    let shoppingList = []
    delItem(shoppingList, 'Chicken')
    expect(shoppingList.length).toBe(0)
})

test('Delete multiple items', () => {
    // shoppingList, name, quantity, category
    let shoppingList = []
    create(shoppingList, 'Apple', '1', 'Fruit')
    create(shoppingList, 'Beer', '3', 'Drinks')
    create(shoppingList, 'Water', '10', 'Drinks')
    create(shoppingList, 'Chicken', '1', 'Meat')
    create(shoppingList, 'Yogurt', '4', 'Dairy')
    expect(shoppingList.length).toBe(5)
    delItem(shoppingList, 'Water')
    expect(shoppingList.length).toBe(4)
    expect(shoppingList[2].name).toBe('Chicken')
    expect(shoppingList[2].quantity).toBe('1')
    expect(shoppingList[2].category).toBe('Meat')
    delItem(shoppingList, 'Apple');
    expect(shoppingList.length).toBe(3)
    expect(shoppingList[0].name).toBe('Beer')
    expect(shoppingList[0].quantity).toBe('3')
    expect(shoppingList[0].category).toBe('Drinks')
})