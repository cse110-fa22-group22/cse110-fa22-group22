import create from '../inventory/create.js'

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

test('Create 2 items with non-existence category', () => {
    let inventoryList = {}
    let name = 'Apple'
    let quantity = '1'
    let category = 'Fruit'
    let name1 = 'Banana'
    let quantity1 = '6'
    let category1 = 'Fruit'

    create(inventoryList, name, quantity, category)
    create(inventoryList, name1, quantity1, category1)

    expect(inventoryList[category].length).toBe(2)
    expect(inventoryList[category][0]['name']).toBe('Apple')
    expect(inventoryList[category][0]['quantity']).toBe('1')
    expect(inventoryList[category][0]['category']).toBe('Fruit')
    expect(inventoryList[category][1]['name']).toBe('Banana')
    expect(inventoryList[category][1]['quantity']).toBe('6')
    expect(inventoryList[category][1]['category']).toBe('Fruit')
})

test('Create 1 item with existence category', () => {
    let inventoryList = { 
        Fruit: [
            { name: 'Banana', quantity: '6', category: 'Fruit' }
        ] 
    }

    let name = 'Apple'
    let quantity = '1'
    let category = 'Fruit'

    create(inventoryList, name, quantity, category)

    expect(inventoryList[category].length).toBe(2)
    expect(inventoryList[category][0]['name']).toBe('Banana')
    expect(inventoryList[category][0]['quantity']).toBe('6')
    expect(inventoryList[category][0]['category']).toBe('Fruit')
    expect(inventoryList[category][1]['name']).toBe('Apple')
    expect(inventoryList[category][1]['quantity']).toBe('1')
    expect(inventoryList[category][1]['category']).toBe('Fruit')
})

test('Create 1 item with non-existence category and inventoryList contains another category', () => {
    let inventoryList = { 
        Meat: [
            { name: 'Ground beef', quantity: '1 lb', category: 'Meat' }
        ] 
    }

    let name = 'Apple'
    let quantity = '1'
    let category = 'Fruit'

    create(inventoryList, name, quantity, category)

    expect(inventoryList['Meat'].length).toBe(1)
    expect(inventoryList['Meat'][0]['name']).toBe('Ground beef')
    expect(inventoryList['Meat'][0]['quantity']).toBe('1 lb')
    expect(inventoryList['Meat'][0]['category']).toBe('Meat')
    expect(inventoryList[category].length).toBe(1)
    expect(inventoryList[category][0]['name']).toBe('Apple')
    expect(inventoryList[category][0]['quantity']).toBe('1')
    expect(inventoryList[category][0]['category']).toBe('Fruit')
})

