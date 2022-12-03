describe('Shopping List: Bought', () => {
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

    it('Bought 1 item with existing item in inventory', async () => {
        let names, name1, name2, quantities, quantity1, quantity2, categories, category1, category2

        const addButton = await page.$('#shopping_add')
        const submitButton = await page.$('#shopping_add_submit')

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Banana')
        await page.$eval('#shopping_add_quantity', el => el.value = '8')
        await page.$eval('#shopping_add_category', el => el.value = 'Fruit')
        await submitButton.click()
        const boughtButton = await page.$('.bought_button')
        await boughtButton.click()

        names = await page.$$('.inventory_name')
        name1 = await names[0].getProperty('innerHTML')
        name1 = await name1.jsonValue()
        name2 = await names[1].getProperty('innerHTML')
        name2 = await name2.jsonValue()
        quantities = await page.$$('.inventory_quantity')
        quantity1 = await quantities[0].getProperty('innerHTML')
        quantity1 = await quantity1.jsonValue()
        quantity2 = await quantities[1].getProperty('innerHTML')
        quantity2 = await quantity2.jsonValue()
        categories = await page.$$('.inventory_category')
        category1 = await categories[0].getProperty('innerHTML')
        category1 = await category1.jsonValue()
        category2 = await categories[1].getProperty('innerHTML')
        category2 = await category2.jsonValue()

        expect(name1).toMatch('Apple')
        expect(quantity1).toMatch('quantity: 5')
        expect(category1).toMatch('category: Fruit')
        expect(name2).toMatch('Banana')
        expect(quantity2).toMatch('quantity: 8')
        expect(category2).toMatch('category: Fruit')
    })

    it('Bought item in different category', async () => {
        let names, name, quantities, quantity, categories, category

        const addButton = await page.$('#shopping_add')
        const submitButton = await page.$('#shopping_add_submit')

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Coke')
        await page.$eval('#shopping_add_quantity', el => el.value = '6 cans')
        await page.$eval('#shopping_add_category', el => el.value = 'Drink')
        await submitButton.click()

        const boughtButton = await page.$('.bought_button')
        await boughtButton.click()

        names = await page.$$('.inventory_name')
        name = await names[2].getProperty('innerHTML')
        name = await name.jsonValue()
        quantities = await page.$$('.inventory_quantity')
        quantity = await quantities[2].getProperty('innerHTML')
        quantity = await quantity.jsonValue()
        categories = await page.$$('.inventory_category')
        category = await categories[2].getProperty('innerHTML')
        category = await category.jsonValue()

        expect(name).toMatch('Coke')
        expect(quantity).toMatch('quantity: 6 cans')
        expect(category).toMatch('category: Drink')
    })
})
