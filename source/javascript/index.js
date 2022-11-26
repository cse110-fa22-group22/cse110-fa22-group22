import create from './shopping/create.js'
import update from './shopping/update.js'
import remove from './shopping/delete.js' // delete is a keyword

const shoppingList = []
// const inventoryList = {}
const client = {}
let updatingItem = {}

client.shopping = {
    create,
    update,
    delete: remove
}

window.addEventListener('DOMContentLoaded', init)

// put all eventlisteners here
function init () {
    window.onclick = function (event) {
        const modal = document.getElementById('shopping_add_modal')
        const updateModal = document.getElementById('shopping_update_modal')
        if (event.target === modal) {
            modal.style.display = 'none'
            if (modal.style.display === 'none') {
                document.getElementById('background_for_modal').style.display = 'none'
            }
        }
        if (event.target === updateModal) {
            updateModal.style.display = 'none'
            if (updateModal.style.display === 'none') {
                document.getElementById('background_for_modal').style.display = 'none'
            }
        }
    }

    document.getElementById('shopping_add').addEventListener('click', () => {
        const modal = document.getElementById('shopping_add_modal')
        modal.style.display = 'flex'
        document.getElementById('background_for_modal').style.display = 'flex'
    })

    document.getElementById('shopping_add_cancel').addEventListener('click', hideShoppingModal)
    document.getElementById('shopping_add_submit').addEventListener('click', addShoppingItem)
    document.getElementById('shopping_update_cancel').addEventListener('click', hideShoppingUpdateModal)
    document.getElementById('shopping_update_submit').addEventListener('click', updateItem)
    
    /*guide event*/
    document.getElementById('guide_btn').addEventListener('click',showGuide)
    document.getElementById('close_guide').addEventListener('click',closeGuide)

    /*suggest list event*/
    document.getElementById('suggest_btn').addEventListener('click',showSuggest)
    document.getElementById('close_suggest').addEventListener('click',closeSuggest)

    /*suggest list add to sp list*/
    document.getElementById('apple_to_sp').addEventListener('click',suggestAddApple)
    document.getElementById('banana_to_sp').addEventListener('click',suggestAddBanana)
    document.getElementById('orange_to_sp').addEventListener('click',suggestAddOrange)
    document.getElementById('tea_to_sp').addEventListener('click',suggestAddTea)
    document.getElementById('juice_to_sp').addEventListener('click',suggestAddJuice)
    document.getElementById('beer_to_sp').addEventListener('click',suggestAddBeer)
    document.getElementById('bread_to_sp').addEventListener('click',suggestAddBread)
    document.getElementById('bagel_to_sp').addEventListener('click',suggestAddBagel)
    document.getElementById('hamburger_to_sp').addEventListener('click',suggestAddHamburger)
    document.getElementById('curry_rice_to_sp').addEventListener('click',suggestAddCurryRice)
    document.getElementById('chair_to_sp').addEventListener('click',suggestAddChaire)
    document.getElementById('potted_plant_to_sp').addEventListener('click',suggestAddPottedPlant)
    document.getElementById('telephone_to_sp').addEventListener('click',suggestAddtelephone)
    readItemFromStorage()
}

function hideShoppingModal () {
    event.preventDefault()
    document.getElementById('shopping_add_modal').style.display = 'none'
    document.getElementById('background_for_modal').style.display = 'none'
}

function hideShoppingUpdateModal () {
    event.preventDefault()
    document.getElementById('shopping_update_modal').style.display = 'none'
    document.getElementById('background_for_modal').style.display = 'none'
}

function addShoppingItem () {
    event.preventDefault()
    // get the value from the input
    const name = document.getElementById('shopping_add_name').value
    const quantity = document.getElementById('shopping_add_quantity').value
    const category = document.getElementById('shopping_add_category').value
    const NumberRegex = /^\d+$/
    let CheckAllPass = true;

    if (!NumberRegex.test(quantity)) {
        alert('quantity has to be a number')
        CheckAllPass = false
    }

    if (!name || !quantity || !category) {
        alert('name or quantity or category can not be empty!')
        CheckAllPass = false
    }

    if(quantity <= 0){
        alert('Quantity needs to be greater than 0')
        CheckAllPass = false
    }
    else{
        if (!client.shopping.create(shoppingList, name, quantity, category)) {
            alert('Item with the same name already existed. Please consider updating the item.')
            CheckAllPass = false
        }
    }

    if(CheckAllPass){
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
    }
   
    
    hideShoppingModal()
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
            console.log(updatingItem)
        })
    }

    const removeButtons = document.getElementsByClassName('remove-button')

    for (const button of removeButtons) {
        button.addEventListener('click', () => { removeShoppingItem(button) })
    }
}

function updateItem (button) {
    event.preventDefault()
    // get the value from the input
    const prevName = updatingItem.innerHTML.split('>')[2].split('<')[0]
    console.log(prevName)
    const name = document.getElementById('shopping_update_name').value
    const quantity = document.getElementById('shopping_update_quantity').value
    const category = document.getElementById('shopping_update_category').value
    const NumberRegex = /^\d+$/
    let CheckAllPass = true;

    if (!name || !quantity || !category) {
        alert('name or quantity or category can not be empty!')
    }
    
    if (!NumberRegex.test(quantity)) {
        alert('quantity has to be a number')
    }

    if(quantity <= 0){
        alert('Quantity needs to be greater than 0')
        CheckAllPass = false
    }
    else{
        if (!client.shopping.create(shoppingList, name, quantity, category)) {
            alert('Item with the same name already existed. Please consider updating the item.')
            CheckAllPass = false
        }
    }

    if(CheckAllPass){
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


function showGuide(){
    document.getElementById("guide").show();
    document.getElementById('background_for_modal').style.display = 'flex'
}

function closeGuide(){
    document.getElementById("guide").close();
    document.getElementById('background_for_modal').style.display = 'none'
}

function showSuggest(){
    document.getElementById("suggest_section").style.display = 'flex';
    document.getElementById('background_for_modal').style.display = 'flex'
}

function closeSuggest(){
    document.getElementById("suggest_section").style.display = 'none';
    document.getElementById('background_for_modal').style.display = 'none'
}


/*suggest list add to Shopping list*/
function suggestAddShoppingItem (iname,icategory) {
    event.preventDefault()
    // get the value from the input
    const name = iname
    const btnName = name.replace(/ /, "_")
    const quantity = document.getElementById(`${btnName}_add_quantity`).value
    const category = icategory
    const NumberRegex = /^\d+$/
    let CheckAllPass = true;

    if (!NumberRegex.test(quantity)) {
        return alert('quantity has to be a number')
    }

    if (!name || !quantity || !category) {
        return alert('name or quantity or category can not be empty!')
    }


    if(quantity <= 0){
        alert('Quantity needs to be greater than 0')
        CheckAllPass = false
    }
    else{
        if (!client.shopping.create(shoppingList, name, quantity, category)) {
            alert('Item with the same name already existed. Please consider updating the item.')
            CheckAllPass = false
        }
    }

    if(CheckAllPass){
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

function suggestAddApple(){
    suggestAddShoppingItem('apple','fruits')
}

function suggestAddBanana(){
    suggestAddShoppingItem('banana','fruits')
}

function suggestAddOrange(){
    suggestAddShoppingItem('orange','fruits')
}

function suggestAddTea(){
    suggestAddShoppingItem('tea','drink')
}

function suggestAddJuice(){
    suggestAddShoppingItem('juice','drink')
}

function suggestAddBeer(){
    suggestAddShoppingItem('beer','drink')
}

function suggestAddBread(){
    suggestAddShoppingItem('bread','food')
}

function suggestAddBagel(){
    suggestAddShoppingItem('bagel','food')
}

function suggestAddHamburger(){
    suggestAddShoppingItem('hamburger','food')
}

function suggestAddCurryRice(){
    suggestAddShoppingItem('curry rice','food')
}

function suggestAddChaire(){
    suggestAddShoppingItem('chair','furniture')
}

function suggestAddPottedPlant(){
    suggestAddShoppingItem('potted plant','furniture')
}

function suggestAddtelephone(){
    suggestAddShoppingItem('telephone','furniture')
}