describe('Shopping List: Update', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5501/source/html/index.html')
    })

    it('Update item name', async () => {
        let list, name, quantity, category

        await page.evaluate(() => { window.localStorage.clear() })

        const addButton = await page.$('#shopping_add')
        const submitButton = await page.$('#shopping_add_submit')
        const updateSubmit = await page.$('#shopping_update_submit')

        list = await page.$('#shopping_list')
        list = await list.getProperty('innerHTML')
        list = await list.jsonValue()
        expect(list).toBe('')

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Apple')
        await page.$eval('#shopping_add_quantity', el => el.value = '5')
        await page.$eval('#shopping_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        const updateButtons = await page.$$('.update')
        await updateButtons[0].click()
        await page.$eval('#shopping_update_name', el => el.value = 'Apple juice')
        await page.$eval('#shopping_update_quantity', el => el.value = '5')
        await page.$eval('#shopping_update_category', el => el.value = 'Fruit')
        await updateSubmit.click()

        name = await page.$('.name')
        name = await name.getProperty('innerHTML')
        name = await name.jsonValue()
        quantity = await page.$('.quantity')
        quantity = await quantity.getProperty('innerHTML')
        quantity = await quantity.jsonValue()
        category = await page.$('.category')
        category = await category.getProperty('innerHTML')
        category = await category.jsonValue()

        expect(name).toMatch('Apple juice')
        expect(quantity).toMatch('quantity: 5')
        expect(category).toMatch('category: Fruit')
    })

    it('Update item name and quantity', async () => {
        let list, name, quantity, category

        await page.evaluate(() => { window.localStorage.clear() })
        await page.reload()

        const addButton = await page.$('#shopping_add')
        const submitButton = await page.$('#shopping_add_submit')
        const updateSubmit = await page.$('#shopping_update_submit')

        list = await page.$('#shopping_list')
        list = await list.getProperty('innerHTML')
        list = await list.jsonValue()
        expect(list).toBe('')

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Apple')
        await page.$eval('#shopping_add_quantity', el => el.value = '5')
        await page.$eval('#shopping_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        const updateButtons = await page.$$('.update')
        await updateButtons[0].click()
        await page.$eval('#shopping_update_name', el => el.value = 'Apple juice')
        await page.$eval('#shopping_update_quantity', el => el.value = '5 bottle')
        await page.$eval('#shopping_update_category', el => el.value = 'Fruit')
        await updateSubmit.click()

        name = await page.$('.name')
        name = await name.getProperty('innerHTML')
        name = await name.jsonValue()
        quantity = await page.$('.quantity')
        quantity = await quantity.getProperty('innerHTML')
        quantity = await quantity.jsonValue()
        category = await page.$('.category')
        category = await category.getProperty('innerHTML')
        category = await category.jsonValue()

        expect(name).toMatch('Apple juice')
        expect(quantity).toMatch('quantity: 5 bottle')
        expect(category).toMatch('category: Fruit')
    })

    it('Update item name, quantity and category', async () => {
        let list, name, quantity, category

        await page.evaluate(() => { window.localStorage.clear() })
        await page.reload()
        
        const addButton = await page.$('#shopping_add')
        const submitButton = await page.$('#shopping_add_submit')
        const updateSubmit = await page.$('#shopping_update_submit')

        list = await page.$('#shopping_list')
        list = await list.getProperty('innerHTML')
        list = await list.jsonValue()
        expect(list).toBe('')

        await addButton.click()
        await page.$eval('#shopping_add_name', el => el.value = 'Apple')
        await page.$eval('#shopping_add_quantity', el => el.value = '5')
        await page.$eval('#shopping_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        const updateButtons = await page.$$('.update')
        await updateButtons[0].click()
        await page.$eval('#shopping_update_name', el => el.value = 'Apple juice')
        await page.$eval('#shopping_update_quantity', el => el.value = '5 bottle')
        await page.$eval('#shopping_update_category', el => el.value = 'Drink')
        await updateSubmit.click()

        name = await page.$('.name')
        name = await name.getProperty('innerHTML')
        name = await name.jsonValue()
        quantity = await page.$('.quantity')
        quantity = await quantity.getProperty('innerHTML')
        quantity = await quantity.jsonValue()
        category = await page.$('.category')
        category = await category.getProperty('innerHTML')
        category = await category.jsonValue()

        expect(name).toMatch('Apple juice')
        expect(quantity).toMatch('quantity: 5 bottle')
        expect(category).toMatch('category: Drink')
    })
})
