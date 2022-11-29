import get from '../inventory/get.js'

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

test('Get existence item', () => {
    let inventoryList = {
        'fruit': [{ name: 'apple', quantity: '6', category: 'fruit' }]
    }

    expect(get(inventoryList, 'apple', 'fruit')).toBe(true)
})

test('Get nonexistence item', () => {
    let inventoryList = {
        'drink': [{ name: 'milk', quantity: '6 bottles', category: 'drink' }]
    }

    expect(get(inventoryList, 'apple', 'fruit')).toBe(false)
})

test('Get existence item in different category', () => {
    let inventoryList = {
        'drink': [{ name: 'apple cider', quantity: '6 bottles', category: 'drink' }]
    }

    expect(get(inventoryList, 'apple cider', 'fruit')).toBe(false)
})