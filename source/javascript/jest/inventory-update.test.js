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
    let inventoryList = {}
    let name = 'Apple'
    let quantity = '1'
    let category = 'Fruit'

    create(inventoryList, name, quantity, category)
    create(inventoryList, 'orange', '3', 'notFruit')
    update(inventoryList,name,category,"Apple Cider",'10',"Drinks")
    inventoryList = JSON.parse(localStorage.getItem('inventoryList'))
    expect(inventoryList['Drinks'].length).toBe(1)
    expect(inventoryList['Drinks'][0]['name']).toBe('Apple Cider')
    expect(inventoryList['Drinks'][0]['quantity']).toBe('10')
    expect(inventoryList['Drinks'][0]['category']).toBe('Drinks')

    expect(inventoryList[category]).toBeUndefined()
})
