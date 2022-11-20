import update from '../shopping/update.js'
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
test('Testing update', () => {
    let shoppingList = [{"name":"Orange","quantity":"5","category":"fruit"},{"name":"Apple","quantity":"15","category":"fruit"}]
    update(shoppingList, "Apple", "Milk", "10", "Drink")
    expect(shoppingList).toStrictEqual([{"name":"Orange","quantity":"5","category":"fruit"},{"name":"Milk","quantity":"10","category":"Drink"}])
})
