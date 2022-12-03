describe('Shopping List: Delete', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5501/source/html/index.html')
    })

    it('Delete 1 item', async () => {
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

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Grapes')
        await page.$eval('#shopping_add_quantity', el => el.value = '20')
        await page.$eval('#shopping_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        const removeButtons = await page.$$('.remove_button')
        await removeButtons[0].click()

        name = await page.$('.name')
        name = await name.getProperty('innerHTML')
        name = await name.jsonValue()
        quantity = await page.$('.quantity')
        quantity = await quantity.getProperty('innerHTML')
        quantity = await quantity.jsonValue()
        category = await page.$('.category')
        category = await category.getProperty('innerHTML')
        category = await category.jsonValue()

        expect(name).toMatch('Grapes')
        expect(quantity).toMatch('quantity: 20')
        expect(category).toMatch('category: Fruit')

    })

    it('Delete multiple items', async () => {
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

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Grapes')
        await page.$eval('#shopping_add_quantity', el => el.value = '20')
        await page.$eval('#shopping_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Beef')
        await page.$eval('#shopping_add_quantity', el => el.value = '12')
        await page.$eval('#shopping_add_category', el => el.value = 'Meat')
        await submitButton.click()

        let removeButtons = await page.$$('.remove_button')
        await removeButtons[1].click()
        removeButtons = await page.$$('.remove_button')
        await removeButtons[1].click()

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
        expect(name2).toMatch('Beef')
        expect(quantity2).toMatch('quantity: 12')
        expect(category2).toMatch('category: Meat')
    })

    it('Delete all the items', async () => {
        let list, name, quantity, category
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

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Beef')
        await page.$eval('#shopping_add_quantity', el => el.value = '12')
        await page.$eval('#shopping_add_category', el => el.value = 'Meat')
        await submitButton.click()

        let removeButtons = await page.$$('.remove_button')
        await removeButtons[0].click()
        removeButtons = await page.$$('.remove_button')
        await removeButtons[0].click()
        removeButtons = await page.$$('.remove_button')
        await removeButtons[0].click()

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Chicken')
        await page.$eval('#shopping_add_quantity', el => el.value = '1')
        await page.$eval('#shopping_add_category', el => el.value = 'Meat')
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

        expect(name).toMatch('Chicken')
        expect(quantity).toMatch('quantity: 1')
        expect(category).toMatch('category: Meat')
    })
})