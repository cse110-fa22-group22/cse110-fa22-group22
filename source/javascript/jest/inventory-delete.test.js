import create from '../inventory/create.js'
import invDelete from '../inventory/delete.js'

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

test('Deleting an item that exists', () => {
    let inventoryList = {}
    create(inventoryList, 'Apple', '2', 'Fruit')
    create(inventoryList, 'Pear', '1', 'Fruit')
    create(inventoryList, 'Banana', '6', 'Fruit')
    expect(inventoryList['Fruit'].length).toBe(3)
    expect(invDelete(inventoryList, 'Pear', 'Fruit')).toBe(true)
    expect(inventoryList['Fruit'].length).toBe(2)
    expect(inventoryList['Fruit'][0]['name']).toBe('Apple')
    expect(inventoryList['Fruit'][0]['quantity']).toBe('2')
    expect(inventoryList['Fruit'][0]['category']).toBe('Fruit')
    expect(inventoryList['Fruit'][1]['name']).toBe('Banana')
    expect(inventoryList['Fruit'][1]['quantity']).toBe('6')
    expect(inventoryList['Fruit'][1]['category']).toBe('Fruit')
})

test('Deleting multiple items that exist', () => {
    let inventoryList = {}
    let category1 = 'Fruit'
    let category2 = 'Meat'
    create(inventoryList, 'Apple', '2', category1)
    create(inventoryList, 'Pear', '1', category1)
    create(inventoryList, 'Banana', '6', category1)
    create(inventoryList, 'Chicken', '1', category2)
    create(inventoryList, 'Ground Beef', '1', category2)
    invDelete(inventoryList, 'Pear', category1)
    invDelete(inventoryList, 'Apple', category1)
    expect(inventoryList[category1][0]['name']).toBe('Banana')
    expect(inventoryList[category1][0]['quantity']).toBe('6')
    expect(inventoryList[category1][0]['category']).toBe(category1)
    expect(inventoryList[category2][0]['name']).toBe('Chicken')
    expect(inventoryList[category2][0]['quantity']).toBe('1')
    expect(inventoryList[category2][0]['category']).toBe(category2)
    expect(inventoryList[category2][1]['name']).toBe('Ground Beef')
    expect(inventoryList[category2][1]['quantity']).toBe('1')
    expect(inventoryList[category2][1]['category']).toBe(category2)
})

test('Deleting all items from a category', () => {
    let inventoryList = {}
    create(inventoryList, 'Apple', '2', 'Fruit')
    create(inventoryList, 'Pear', '1', 'Fruit')
    create(inventoryList, 'Banana', '6', 'Fruit')
    expect(inventoryList['Fruit'].length).toBe(3)
    expect(invDelete(inventoryList, 'Pear', 'Fruit')).toBe(true)
    expect(inventoryList['Fruit'].length).toBe(2)
    expect(invDelete(inventoryList, 'Apple', 'Fruit')).toBe(true)
    expect(inventoryList['Fruit'].length).toBe(1)
    expect(invDelete(inventoryList, 'Banana', 'Fruit')).toBe(true)
    expect(inventoryList['Fruit']).toBeUndefined()
})

test('Deleting item that doesnt exist', () => {
    let inventoryList = {}
    create(inventoryList, 'Apple', '2', 'Fruit')
    create(inventoryList, 'Pear', '1', 'Fruit')
    create(inventoryList, 'Banana', '6', 'Fruit')
    expect(inventoryList['Fruit'].length).toBe(3)
    expect(invDelete(inventoryList, 'Orange', 'Fruit')).toBe(false)
    expect(inventoryList['Fruit'].length).toBe(3)
})

test('Deleting from category that doesnt exist', () => {
    let inventoryList = {}
    create(inventoryList, 'Apple', '2', 'Fruit')
    create(inventoryList, 'Pear', '1', 'Fruit')
    create(inventoryList, 'Banana', '6', 'Fruit')
    expect(inventoryList['Fruit'].length).toBe(3)
    expect(invDelete(inventoryList, 'Chicken', 'Meat')).toBe(false)
    expect(inventoryList['Fruit'].length).toBe(3)
})