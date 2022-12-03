describe('Shopping List: Create', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5501/source/html/index.html')
    })

    it('Bought 1 item', async () => {
        let shoppingList, inventoryList, name, quantity, category

        await page.evaluate(() => { window.localStorage.clear() })

        const addButton = await page.$('#shopping_add')
        const submitButton = await page.$('#shopping_add_submit')

        shoppingList = await page.$('#shopping_list')
        shoppingList = await shoppingList.getProperty('innerHTML')
        shoppingList = await shoppingList.jsonValue()
        expect(shoppingList).toBe('')

        inventoryList = await page.$('#shopping_list')
        inventoryList = await inventoryList.getProperty('innerHTML')
        inventoryList = await inventoryList.jsonValue()
        expect(inventoryList).toBe('')

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Apple')
        await page.$eval('#shopping_add_quantity', el => el.value = '5')
        await page.$eval('#shopping_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        name = await page.$('.name')
        name = await name.getProperty('innerHTML')
        name = await name.jsonValue()
        quantity = await page.$('.quantity')
        quantity = await quantity.getProperty('innerHTML')
        quantity = await quantity.jsonValue()
        category = await page.$('.category')
        category = await category.getProperty('innerHTML')
        category = await category.jsonValue()

        expect(name).toMatch('Apple')
        expect(quantity).toMatch('quantity: 5')
        expect(category).toMatch('category: Fruit')

        const boughtButton = await page.$('.bought_button')
        await boughtButton.click()

        name = await page.$('.inventory_name')
        name = await name.getProperty('innerHTML')
        name = await name.jsonValue()
        quantity = await page.$('.inventory_quantity')
        quantity = await quantity.getProperty('innerHTML')
        quantity = await quantity.jsonValue()
        category = await page.$('.inventory_category')
        category = await category.getProperty('innerHTML')
        category = await category.jsonValue()

        expect(name).toMatch('Apple')
        expect(quantity).toMatch('quantity: 5')
        expect(category).toMatch('category: Fruit')
    })
})
