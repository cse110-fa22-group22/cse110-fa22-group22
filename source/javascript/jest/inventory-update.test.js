import create from '../inventory/create.js'
import update from '../inventory/update.js'

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

test('update a item to non-existence category', () => {
    let inventoryList = {
        fruit: [{ name: 'apple', quantity: '6', category: 'fruit'}]
    }
    expect(update(inventoryList, 'apple', 'fruit', 'apple cider', '6 bottles', 'drink')).toBe(true)
    expect(inventoryList['drink'].length).toBe(1)
    expect(inventoryList['drink'][0]['name']).toBe('apple cider')
    expect(inventoryList['drink'][0]['quantity']).toBe('6 bottles')
    expect(inventoryList['drink'][0]['category']).toBe('drink')
    expect(inventoryList['fruit']).toBeUndefined()
})

test('update a item to existence category', () => {
    let inventoryList = {
        fruit: [{ name: 'apple', quantity: '6', category: 'fruit'}],
        drink: [{ name: 'milk', quantity: '3 pints', category: 'drink'}]
    }
    expect(update(inventoryList, 'apple', 'fruit', 'apple cider','6 bottles', 'drink')).toBe(true)
    expect(inventoryList['drink'].length).toBe(2)
    expect(inventoryList['drink'][0]['name']).toBe('milk')
    expect(inventoryList['drink'][0]['quantity']).toBe('3 pints')
    expect(inventoryList['drink'][0]['category']).toBe('drink')
    expect(inventoryList['drink'][1]['name']).toBe('apple cider')
    expect(inventoryList['drink'][1]['quantity']).toBe('6 bottles')
    expect(inventoryList['drink'][1]['category']).toBe('drink')
    expect(inventoryList['fruit']).toBeUndefined()
})
