import create from '../inventory/update.js'

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

test('Create 1 item with non-existence category', () => {
    let inventoryList = {}
    let name = 'Apple'
    let quantity = '1'
    let category = 'Fruit'

    create(inventoryList, name, quantity, category)

    expect(inventoryList[category].length).toBe(1)
    expect(inventoryList[category][0]['name']).toBe('Apple')
    expect(inventoryList[category][0]['quantity']).toBe('1')
    expect(inventoryList[category][0]['category']).toBe('Fruit')
})