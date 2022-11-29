import create from './shopping/create.js'
import update from './shopping/update.js'
import remove from './shopping/delete.js' // delete is a keyword
import inventoryCreate from './inventory/create.js'

const shoppingList = []
let inventoryList = {}
const client = {}
let updatingItem = {}

client.shopping = {
    create,
    update,
    delete: remove
}

client.inventory = {
    create: inventoryCreate
}

window.addEventListener('DOMContentLoaded', init)

// put all eventlisteners here
function init () {
    window.onclick = function (event) {
        const modal = document.getElementById('shopping_add_modal')
        const updateModal = document.getElementById('shopping_update_modal')
        if (event.target === modal) {
            modal.style.display = 'none'
            document.getElementById('background_for_modal').style.display = 'none'
        }
        if (event.target === updateModal) {
            updateModal.style.display = 'none'
            document.getElementById('background_for_modal').style.display = 'none'
        }

        const inventoryModal = document.getElementById('inventory_add_modal')
        const inventoryUpdateModal = document.getElementById('inventory_update_modal')
        if (event.target === inventoryModal) {
            inventoryModal.style.display = 'none'
            document.getElementById('background_for_modal').style.display = 'none'
        }
        if (event.target === inventoryUpdateModal) {
            inventoryUpdateModal.style.display = 'none'
            document.getElementById('background_for_modal').style.display = 'none'
        }
    }

    document.getElementById('shopping_add').addEventListener('click', () => {
        const modal = document.getElementById('shopping_add_modal')
        modal.style.display = 'flex'
        document.getElementById('background_for_modal').style.display = 'flex'
    })

    document.getElementById('inventory_add').addEventListener('click', () => {
        const modal = document.getElementById('inventory_add_modal')
        modal.style.display = 'flex'
        document.getElementById('background_for_modal').style.display = 'flex'
    })

    document.getElementById('shopping_add_cancel').addEventListener('click', hideShoppingModal)
    document.getElementById('shopping_add_submit').addEventListener('click', addShoppingItem)
    document.getElementById('shopping_update_cancel').addEventListener('click', hideShoppingUpdateModal)
    document.getElementById('shopping_update_submit').addEventListener('click', updateItem)

    document.getElementById('inventory_add_cancel').addEventListener('click', hideInventoryModal)
    document.getElementById('inventory_add_submit').addEventListener('click', addInventoryItem)
    document.getElementById('inventory_update_cancel').addEventListener('click', hideInventoryUpdateModal)
    // document.getElementById('inventory_update_submit').addEventListener('click', updateInventoryItem)

    /* guide event */
    document.getElementById('guide_btn').addEventListener('click', showGuide)
    document.getElementById('close_guide').addEventListener('click', closeGuide)

    /* suggest list event */
    document.getElementById('suggest_btn_1').addEventListener('click', showSuggest)
    document.getElementById('suggest_btn_2').addEventListener('click', showSuggest)
    document.getElementById('close_suggest').addEventListener('click', closeSuggest)

    /* suggest list add to sp list */
    document.getElementById('apple_to_sp').addEventListener('click', SuggestAddApple)
    document.getElementById('banana_to_sp').addEventListener('click', SuggestAddBanana)
    document.getElementById('orange_to_sp').addEventListener('click', SuggestAddOrange)
    document.getElementById('tea_to_sp').addEventListener('click', SuggestAddTea)
    document.getElementById('juice_to_sp').addEventListener('click', SuggestAddJuice)
    document.getElementById('beer_to_sp').addEventListener('click', SuggestAddBeer)
    document.getElementById('bread_to_sp').addEventListener('click', SuggestAddBread)
    document.getElementById('bagel_to_sp').addEventListener('click', SuggestAddBagel)
    document.getElementById('hamburger_to_sp').addEventListener('click', SuggestAddHamburger)
    document.getElementById('curry_rice_to_sp').addEventListener('click', SuggestAddCurryRice)
    document.getElementById('chair_to_sp').addEventListener('click', SuggestAddChaire)
    document.getElementById('potted_plant_to_sp').addEventListener('click', SuggestAddPottedPlant)
    document.getElementById('telephone_to_sp').addEventListener('click', SuggestAddtelephone)
    readItemFromStorage()
    generateInventoryList()
}

function hideShoppingModal () {
    event.preventDefault()
    document.getElementById('shopping_add_modal').style.display = 'none'
    document.getElementById('background_for_modal').style.display = 'none'
}

function hideInventoryModal () {
    event.preventDefault()
    document.getElementById('inventory_add_modal').style.display = 'none'
    document.getElementById('background_for_modal').style.display = 'none'
}

function hideShoppingUpdateModal () {
    event.preventDefault()
    document.getElementById('shopping_update_modal').style.display = 'none'
    document.getElementById('background_for_modal').style.display = 'none'
}

function hideInventoryUpdateModal () {
    event.preventDefault()
    document.getElementById('inventory_update_modal').style.display = 'none'
    document.getElementById('background_for_modal').style.display = 'none'
}

function addShoppingItem () {
    event.preventDefault()
    const name = document.getElementById('shopping_add_name').value
    const quantity = document.getElementById('shopping_add_quantity').value
    const category = document.getElementById('shopping_add_category').value

    if (!name || !quantity || !category) {
        return alert('name or quantity or category can not be empty!')
    }

    if (!client.shopping.create(shoppingList, name, quantity, category)) {
        return alert('Item with the same name already existed. Please consider updating the item.')
    }

    const list = document.getElementById('shopping_list')
    list.innerHTML += `
        <li>
            <input type="checkbox">
            <span class="name">${name}</span> | 
            <span class="quantity">quantity: ${quantity}</span> | 
            <span class="category">category: ${category} </span>
            <span><button class="update">update</button></span>
            <span class="remove_button">❌</span>
        </li>
    `
    addEvents()
    hideShoppingModal()
    document.getElementById('shopping_add_name').value = ''
    document.getElementById('shopping_add_quantity').value = ''
    document.getElementById('shopping_add_category').value = ''
}

async function addInventoryItem () {
    event.preventDefault()
    const name = document.getElementById('inventory_add_name').value
    const quantity = document.getElementById('inventory_add_quantity').value
    const category = document.getElementById('inventory_add_category').value

    if (!name || !quantity || !category) {
        return alert('name or quantity or category can not be empty!')
    }

    if (!client.inventory.create(inventoryList, name, quantity, category)) {
        return alert('Item with the same name already existed. Please consider updating the item.')
    }
    await generateInventoryList(category)
    hideInventoryModal()
    document.getElementById('shopping_add_name').value = ''
    document.getElementById('shopping_add_quantity').value = ''
    document.getElementById('shopping_add_category').value = ''
}

function addEvents () {
    const updateButtons = document.getElementsByClassName('update')

    for (const button of updateButtons) {
        button.addEventListener('click', () => {
            const modal = document.getElementById('shopping_update_modal')
            modal.style.display = 'flex'
            document.getElementById('background_for_modal').style.display = 'flex'
            updatingItem = button.parentNode.parentNode
        })
    }

    const removeButtons = document.getElementsByClassName('remove_button')

    for (const button of removeButtons) {
        button.addEventListener('click', () => { removeShoppingItem(button) })
    }
}

function addInventoryEvents () {
    const updateButtons = document.getElementsByClassName('inventory_update')

    for (const button of updateButtons) {
        button.addEventListener('click', () => {
            const modal = document.getElementById('inventory_update_modal')
            modal.style.display = 'flex'
            document.getElementById('background_for_modal').style.display = 'flex'
            updatingItem = button.parentNode.parentNode
        })
    }

    // const removeButtons = document.getElementsByClassName('inventory_remove_button')

    // for (const button of removeButtons) {
    //     button.addEventListener('click', () => { removeInventoryItem(button) })
    // }
}

function updateItem (button) {
    event.preventDefault()
    // get the value from the input
    const prevName = updatingItem.innerHTML.split('>')[2].split('<')[0]
    const name = document.getElementById('shopping_update_name').value
    const quantity = document.getElementById('shopping_update_quantity').value
    const category = document.getElementById('shopping_update_category').value
    let CheckAllPass = true

    /* Check whether the input is valid */
    if (!name || !quantity || !category) {
        alert('name or quantity or category can not be empty!')
        CheckAllPass = false
        return
    }

    if (quantity <= 0) {
        alert('Quantity needs to be greater than 0')
        CheckAllPass = false
        return
    } else {
        if (!client.shopping.update(shoppingList, prevName, name, quantity, category)) {
            alert('Item with the same name already existed. Please consider updating the item.')
            CheckAllPass = false
            return
        }
    }

    if (CheckAllPass) {
        updatingItem.children[1].innerText = name
        updatingItem.children[2].innerText = 'quantity: ' + quantity
        updatingItem.children[3].innerText = 'category: ' + category
    }
    hideShoppingUpdateModal()
    document.getElementById('shopping_update_name').value = ''
    document.getElementById('shopping_update_quantity').value = ''
    document.getElementById('shopping_update_category').value = ''
}

function removeShoppingItem (button) {
    const item = button.parentNode
    const name = item.innerHTML.split('>')[2].split('<')[0]
    item.parentNode.removeChild(item)
    client.shopping.delete(shoppingList, name)
}

async function readItemFromStorage () {
    const shoppingListFromStorage = JSON.parse(localStorage.getItem('shoppingList'))
    const list = document.getElementById('shopping_list')
    if (shoppingListFromStorage != null) {
        for (const item of shoppingListFromStorage) {
            list.innerHTML += `
            <li>
                <input type="checkbox">
                <span class="name">${item.name}</span> | 
                <span class="quantity">quantity: ${item.quantity}</span> | 
                <span class="category">category: ${item.category} </span>
                <span><button class="update">update</button></span>
                <span class="remove-button">❌</span>
            </li>
            `
            shoppingList.push({ name: item.name, quantity: item.quantity, category: item.category })
        }
    }
    addEvents()
}

async function generateInventoryList (openCategory) {
    inventoryList = JSON.parse(localStorage.getItem('inventoryList'))
    const list = document.getElementById('inventory_list')
    list.innerHTML = ''
    if (inventoryList != null) {
        for (const [key, value] of Object.entries(inventoryList)) {
            let htmlList = ''
            for (let i = 0; i < value.length; i++) {
                htmlList += `
                    <li style="display: block">
                        <span class="inventory_name">${value[i].name}</span> | 
                        <span class="inventory_quantity">quantity: ${value[i].quantity}</span> | 
                        <span class="inventory_category">category: ${value[i].category} </span>
                        <span><button class="inventory_update">update</button></span>
                        <span class="inventory_remove_button">❌</span>
                    </li>
                `
            }
            list.innerHTML += `
            <li>
                <details ${(openCategory === key) ? 'open' : ''}>
                <summary>${key}</summary>
                    <ul>
                        ${htmlList}
                    </ul>
                </details>
            </li>
            `
        }
    }
    addInventoryEvents()
}

/* show the user guide */
function showGuide () {
    document.getElementById('guide').show()
    document.getElementById('background_for_modal').style.display = 'flex'
}

/* close the user guide */
function closeGuide () {
    document.getElementById('guide').close()
    document.getElementById('background_for_modal').style.display = 'none'
}

/* show the user suggest list */
function showSuggest () {
    document.getElementById('suggest_section').style.display = 'flex'
    document.getElementById('background_for_modal').style.display = 'flex'
}

/* close the user suggest list */
function closeSuggest () {
    document.getElementById('suggest_section').style.display = 'none'
    document.getElementById('background_for_modal').style.display = 'none'
}

/* suggest list add to Shopping list */
function SuggestAddShoppingItem (iname, icategory) {
    event.preventDefault()
    // get the value from the input
    const name = iname
    const btnName = name.replace(/ /, '_')
    const quantity = document.getElementById(`${btnName}_add_quantity`).value
    const category = icategory
    let CheckAllPass = true

    /* Check whether the input is valid */
    if (!name || !quantity || !category) {
        CheckAllPass = false
        alert('name or quantity or category can not be empty!')
        return
    }

    if (quantity <= 0) {
        alert('Quantity needs to be greater than 0')
        CheckAllPass = false
        return
    } else {
        if (!client.shopping.create(shoppingList, name, quantity, category)) {
            alert('Item with the same name already existed. Please consider updating the item.')
            CheckAllPass = false
            return
        }
    }

    if (CheckAllPass) {
        const list = document.getElementById('shopping_list')
        list.innerHTML += `
            <li>
                <input type="checkbox">
                <span class="name">${name}</span> | 
                <span class="quantity">quantity: ${quantity}</span> | 
                <span class="category">category: ${category} </span>
                <span><button class="update">update</button></span>
                <span class="remove-button">❌</span>
            </li>
        `
        client.shopping.create(shoppingList, name, quantity, category)
        addEvents()
        alert('Item has been successfully added to shopping list')
    }

    document.getElementById('shopping_add_name').value = ''
    document.getElementById('shopping_add_quantity').value = ''
    document.getElementById('shopping_add_category').value = ''
}

/* These are preset item functions for suggest list */
function SuggestAddApple () {
    SuggestAddShoppingItem('apple', 'fruits')
}

function SuggestAddBanana () {
    SuggestAddShoppingItem('banana', 'fruits')
}

function SuggestAddOrange () {
    SuggestAddShoppingItem('orange', 'fruits')
}

function SuggestAddTea () {
    SuggestAddShoppingItem('tea', 'drink')
}

function SuggestAddJuice () {
    SuggestAddShoppingItem('juice', 'drink')
}

function SuggestAddBeer () {
    SuggestAddShoppingItem('beer', 'drink')
}

function SuggestAddBread () {
    SuggestAddShoppingItem('bread', 'food')
}

function SuggestAddBagel () {
    SuggestAddShoppingItem('bagel', 'food')
}

function SuggestAddHamburger () {
    SuggestAddShoppingItem('hamburger', 'food')
}

function SuggestAddCurryRice () {
    SuggestAddShoppingItem('curry rice', 'food')
}

function SuggestAddChaire () {
    SuggestAddShoppingItem('chair', 'furniture')
}

function SuggestAddPottedPlant () {
    SuggestAddShoppingItem('potted plant', 'furniture')
}

function SuggestAddtelephone () {
    SuggestAddShoppingItem('telephone', 'furniture')
}
