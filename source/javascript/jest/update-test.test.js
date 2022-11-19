const update = require('../shopping/update.js');

test('Testing update', () => {
    let shoppingList = [{"name":"Orange","quantity":"5","category":"fruit"},{"name":"Apple","quantity":"15","category":"fruit"}]
    client.shopping.create(shoppingList, "Apple", "10", "fruit")
    expect(shoppingList).toBe({"name":"Orange","quantity":"5","category":"fruit"},{"name":"Apple","quantity":"10","category":"fruit"})
})
