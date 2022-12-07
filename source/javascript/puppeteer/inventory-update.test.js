describe('Inventory List: Update', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5501/source/html/index.html')
    })

    it('update item name', async () => {
        let list, name, quantity, category

        await page.evaluate(() => { window.localStorage.clear() })

        const addButton = await page.$('#inventory_add')
        const submitButton = await page.$('#inventory_add_submit')
        const updateSubmit = await page.$('#inventory_update_submit')

        list = await page.$('#inventory_list')
        list = await list.getProperty('innerHTML')
        list = await list.jsonValue()
        expect(list).toBe('')

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Apple')
        await page.$eval('#inventory_add_quantity', el => el.value = '5')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        const updateButtons = await page.$$('.inventory_update')
        await updateButtons[0].click()
        await page.$eval('#inventory_update_name', el => el.value = 'Apple juice')
        await page.$eval('#inventory_update_quantity', el => el.value = '5')
        await page.$eval('#inventory_update_category', el => el.value = 'Fruit')
        await updateSubmit.click()

        name = await page.$('.inventory_name')
        name = await name.getProperty('innerHTML')
        name = await name.jsonValue()
        quantity = await page.$('.inventory_quantity')
        quantity = await quantity.getProperty('innerHTML')
        quantity = await quantity.jsonValue()
        category = await page.$('.inventory_category')
        category = await category.getProperty('innerHTML')
        category = await category.jsonValue()

        expect(name).toMatch('Apple juice')
        expect(quantity).toMatch('quantity: 5')
        expect(category).toMatch('category: Fruit')
    })

    it('update item name and quantity', async () => {
        let list, name, quantity, category

        await page.evaluate(() => { window.localStorage.clear() })
        await page.reload()
        const addButton = await page.$('#inventory_add')
        const submitButton = await page.$('#inventory_add_submit')
        const updateSubmit = await page.$('#inventory_update_submit')

        list = await page.$('#inventory_list')
        list = await list.getProperty('innerHTML')
        list = await list.jsonValue()
        expect(list).toBe('')

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Apple')
        await page.$eval('#inventory_add_quantity', el => el.value = '5')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        const updateButtons = await page.$$('.inventory_update')
        await updateButtons[0].click()
        await page.$eval('#inventory_update_name', el => el.value = 'Apple juice')
        await page.$eval('#inventory_update_quantity', el => el.value = '10 Bottle')
        await page.$eval('#inventory_update_category', el => el.value = 'Fruit')
        await updateSubmit.click()

        name = await page.$('.inventory_name')
        name = await name.getProperty('innerHTML')
        name = await name.jsonValue()
        quantity = await page.$('.inventory_quantity')
        quantity = await quantity.getProperty('innerHTML')
        quantity = await quantity.jsonValue()
        category = await page.$('.inventory_category')
        category = await category.getProperty('innerHTML')
        category = await category.jsonValue()

        expect(name).toMatch('Apple juice')
        expect(quantity).toMatch('quantity: 10 Bottle')
        expect(category).toMatch('category: Fruit')
    })

    it('update item name, quantity and category', async () => {
        let list, name, quantity, category

        await page.evaluate(() => { window.localStorage.clear() })
        await page.reload()
        const addButton = await page.$('#inventory_add')
        const submitButton = await page.$('#inventory_add_submit')
        const updateSubmit = await page.$('#inventory_update_submit')

        list = await page.$('#inventory_list')
        list = await list.getProperty('innerHTML')
        list = await list.jsonValue()
        expect(list).toBe('')

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Apple')
        await page.$eval('#inventory_add_quantity', el => el.value = '5')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        const updateButtons = await page.$$('.inventory_update')
        await updateButtons[0].click()
        await page.$eval('#inventory_update_name', el => el.value = 'Apple juice')
        await page.$eval('#inventory_update_quantity', el => el.value = '10 Bottle')
        await page.$eval('#inventory_update_category', el => el.value = 'Drink')
        await updateSubmit.click()

        name = await page.$('.inventory_name')
        name = await name.getProperty('innerHTML')
        name = await name.jsonValue()
        quantity = await page.$('.inventory_quantity')
        quantity = await quantity.getProperty('innerHTML')
        quantity = await quantity.jsonValue()
        category = await page.$('.inventory_category')
        category = await category.getProperty('innerHTML')
        category = await category.jsonValue()

        expect(name).toMatch('Apple juice')
        expect(quantity).toMatch('quantity: 10 Bottle')
        expect(category).toMatch('category: Drink')
    })
})