describe('Inventory List: Delete', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5501/source/html/index.html')
    })

    it('Delete 1 item', async () => {
        let list, name, quantity, category

        await page.evaluate(() => { window.localStorage.clear() })

        const addButton = await page.$('#inventory_add')
        const submitButton = await page.$('#inventory_add_submit')

        list = await page.$('#inventory_list')
        list = await list.getProperty('innerHTML')
        list = await list.jsonValue()
        expect(list).toBe('')

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Apple')
        await page.$eval('#inventory_add_quantity', el => el.value = '5')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Grapes')
        await page.$eval('#inventory_add_quantity', el => el.value = '20')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        const removeButtons = await page.$$('.inventory_remove_button')
        await removeButtons[0].click()

        name = await page.$('.inventory_name')
        name = await name.getProperty('innerHTML')
        name = await name.jsonValue()
        quantity = await page.$('.inventory_quantity')
        quantity = await quantity.getProperty('innerHTML')
        quantity = await quantity.jsonValue()
        category = await page.$('.inventory_category')
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

        const addButton = await page.$('#inventory_add')
        const submitButton = await page.$('#inventory_add_submit')

        list = await page.$('#inventory_list')
        list = await list.getProperty('innerHTML')
        list = await list.jsonValue()
        expect(list).toBe('')

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Apple')
        await page.$eval('#inventory_add_quantity', el => el.value = '5')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Grapes')
        await page.$eval('#inventory_add_quantity', el => el.value = '20')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Banana')
        await page.$eval('#inventory_add_quantity', el => el.value = '1')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Orange')
        await page.$eval('#inventory_add_quantity', el => el.value = '3')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Cherries')
        await page.$eval('#inventory_add_quantity', el => el.value = '30')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        let removeButtons = await page.$$('.inventory_remove_button')
        expect(removeButtons.length).toBe(5)
        await removeButtons[0].click()
        removeButtons = await page.$$('.inventory_remove_button')
        await removeButtons[0].click()
        removeButtons = await page.$$('.inventory_remove_button')
        await removeButtons[1].click()
        
        name = await page.$$('.inventory_name')
        name1 = await name[0].getProperty('innerHTML')
        name1 = await name1.jsonValue()
        name2 = await name[1].getProperty('innerHTML')
        name2 = await name2.jsonValue()

        quantity = await page.$$('.inventory_quantity')
        quantity1 = await quantity[0].getProperty('innerHTML')
        quantity1 = await quantity1.jsonValue()
        quantity2 = await quantity[1].getProperty('innerHTML')
        quantity2 = await quantity2.jsonValue()

        category = await page.$$('.inventory_category')
        category1 = await category[0].getProperty('innerHTML')
        category1 = await category1.jsonValue()
        category2 = await category[1].getProperty('innerHTML')
        category2 = await category2.jsonValue()

        expect(name1).toMatch('Banana')
        expect(quantity1).toMatch('quantity: 1')
        expect(category1).toMatch('category: Fruit')
        expect(name2).toMatch('Cherries')
        expect(quantity2).toMatch('quantity: 30')
        expect(category2).toMatch('category: Fruit')
    })

    it('Delete all the items', async () => {
        let list, name, name1, name2, quantity, quantity1, quantity2, category, category1, category2

        await page.evaluate(() => { window.localStorage.clear() })
        await page.reload()

        const addButton = await page.$('#inventory_add')
        const submitButton = await page.$('#inventory_add_submit')

        list = await page.$('#inventory_list')
        list = await list.getProperty('innerHTML')
        list = await list.jsonValue()
        expect(list).toBe('')

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Apple')
        await page.$eval('#inventory_add_quantity', el => el.value = '5')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Grapes')
        await page.$eval('#inventory_add_quantity', el => el.value = '20')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Banana')
        await page.$eval('#inventory_add_quantity', el => el.value = '1')
        await page.$eval('#inventory_add_category', el => el.value = 'Fruit')
        await submitButton.click()

        let removeButtons = await page.$$('.inventory_remove_button')
        expect(removeButtons.length).toBe(3)
        await removeButtons[0].click()
        removeButtons = await page.$$('.inventory_remove_button')
        await removeButtons[0].click()
        removeButtons = await page.$$('.inventory_remove_button')
        await removeButtons[0].click()

        await addButton.click()
        await page.$eval('#inventory_add_name', el => el.value = 'Chicken')
        await page.$eval('#inventory_add_quantity', el => el.value = '1')
        await page.$eval('#inventory_add_category', el => el.value = 'Meat')
        await submitButton.click()

        name = await page.$('.inventory_name')
        name = await name.getProperty('innerHTML')
        name = await name.jsonValue()
        quantity = await page.$('.inventory_quantity')
        quantity = await quantity.getProperty('innerHTML')
        quantity = await quantity.jsonValue()
        category = await page.$('.inventory_category')
        category = await category.getProperty('innerHTML')
        category = await category.jsonValue()

        expect(name).toMatch('Chicken')
        expect(quantity).toMatch('quantity: 1')
        expect(category).toMatch('category: Meat')
    })
})