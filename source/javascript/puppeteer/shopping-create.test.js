describe('Shopping List: Create', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5501/source/html/index.html')
    })

    it('Create 1 item', async () => {
        let list, name, quantity, category

        await page.evaluate(() => { window.localStorage.clear() })

        const addButton = await page.$('#shopping_add')
        const submitButton = await page.$('#shopping_add_submit')

        list = await page.$('#shopping_list')
        list = await list.getProperty('innerHTML')
        list = await list.jsonValue()
        expect(list).toBe('')

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
    })

    it('Create 2 items', async () => {
        let list, name, name1, name2, quantity, quantity1, quantity2, category, category1, category2

        await page.evaluate(() => { window.localStorage.clear() })
        await page.reload()

        const addButton = await page.$('#shopping_add')
        const submitButton = await page.$('#shopping_add_submit')

        list = await page.$('#shopping_list')
        list = await list.getProperty('innerHTML')
        list = await list.jsonValue()
        expect(list).toBe('')

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Apple')
        await page.$eval('#shopping_add_quantity', el => el.value = '5')
        await page.$eval('#shopping_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Banana')
        await page.$eval('#shopping_add_quantity', el => el.value = '10')
        await page.$eval('#shopping_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        name = await page.$$('.name')
        name1 = await name[0].getProperty('innerHTML')
        name1 = await name1.jsonValue()
        name2 = await name[1].getProperty('innerHTML')
        name2 = await name2.jsonValue()

        quantity = await page.$$('.quantity')
        quantity1 = await quantity[0].getProperty('innerHTML')
        quantity1 = await quantity1.jsonValue()
        quantity2 = await quantity[1].getProperty('innerHTML')
        quantity2 = await quantity2.jsonValue()

        category = await page.$$('.category')
        category1 = await category[0].getProperty('innerHTML')
        category1 = await category1.jsonValue()
        category2 = await category[1].getProperty('innerHTML')
        category2 = await category2.jsonValue()

        expect(name1).toMatch('Apple')
        expect(quantity1).toMatch('quantity: 5')
        expect(category1).toMatch('category: Fruit')
        expect(name2).toMatch('Banana')
        expect(quantity2).toMatch('quantity: 10')
        expect(category2).toMatch('category: Fruit')
    })

    it('Create 1 items with existing items', async () => {
        let name, quantity, category

        const addButton = await page.$('#shopping_add')
        const submitButton = await page.$('#shopping_add_submit')

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Mango')
        await page.$eval('#shopping_add_quantity', el => el.value = '4')
        await page.$eval('#shopping_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        name = await page.$$('.name')
        name = await name[2].getProperty('innerHTML')
        name = await name.jsonValue()

        quantity = await page.$$('.quantity')
        quantity = await quantity[2].getProperty('innerHTML')
        quantity = await quantity.jsonValue()

        category = await page.$$('.category')
        category = await category[2].getProperty('innerHTML')
        category = await category.jsonValue()

        expect(name).toMatch('Mango')
        expect(quantity).toMatch('quantity: 4')
        expect(category).toMatch('category: Fruit')
    })
})
