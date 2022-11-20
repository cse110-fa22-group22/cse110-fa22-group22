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

test('Create 2 items with different name', () => {
    // shoppingList, name, quantity, category
    let shoppingList = []
    let name = 'Apple'
    let quantity = '1'
    let category = 'Fruit'
    let name1 = 'Banana'
    let quantity1 = '6'
    let category1 = 'Fruit'

    expect(create(shoppingList, name, quantity, category)).toBe(true);
    expect(create(shoppingList, name1, quantity1, category1)).toBe(true);

    expect(shoppingList.length).toBe(2)
    expect(shoppingList[0].name).toBe('Apple')
    expect(shoppingList[0].quantity).toBe('1')
    expect(shoppingList[0].category).toBe('Fruit')
    expect(shoppingList[1].name).toBe('Banana')
    expect(shoppingList[1].quantity).toBe('6')
    expect(shoppingList[1].category).toBe('Fruit')
})

test('Create 2 items with same name', () => {
    // shoppingList, name, quantity, category
    let shoppingList = []
    let name = 'Apple'
    let quantity = '1'
    let category = 'Fruit'

    expect(create(shoppingList, name, quantity, category)).toBe(true)
    expect(create(shoppingList, name, quantity, category)).toBe(false)

    expect(shoppingList.length).toBe(1)
    expect(shoppingList[0].name).toBe('Apple')
    expect(shoppingList[0].quantity).toBe('1')
    expect(shoppingList[0].category).toBe('Fruit')
})
