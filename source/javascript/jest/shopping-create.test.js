import create from '../shopping/create.js'

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

test('Create 1 item', () => {
    // shoppingList, name, quantity, category
    let shoppingList = []
    let name = 'Apple'
    let quantity = '1'
    let category = 'Fruit'

    create(shoppingList, name, quantity, category)

    expect(shoppingList.length).toBe(1)
    expect(shoppingList[0].name).toBe('Apple')
    expect(shoppingList[0].quantity).toBe('1')
    expect(shoppingList[0].category).toBe('Fruit')
})
