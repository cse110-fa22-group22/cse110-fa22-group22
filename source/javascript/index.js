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
        const modal = document.getElementById('shopping_modal')
        const updateModal = document.getElementById('shopping_modal_update')
        const bg_for_modal = document.getElementById('background_for_modal')
        if (event.target === modal) {
            modal.style.display = 'none'
            if(modal.style.display == 'none'){
                bg_for_modal.style.display = 'none'
            }
        }
        if (event.target === updateModal) {
            updateModal.style.display = 'none'
            if(updateModal.style.display == 'none'){
                bg_for_modal.style.display = 'none'
            }
        }

    }

    document.getElementById('shopping_add').addEventListener('click', () => {
        const modal = document.getElementById('shopping_modal')
        modal.style.display = 'flex'
        document.getElementById('background_for_modal').style.display = 'flex'
    })

    document.getElementById('shopping_cancel').addEventListener('click', hideShoppingModal)
    document.getElementById('shopping_submit').addEventListener('click', addShoppingItem)
    document.getElementById('shopping_cancel_update').addEventListener('click', hideShoppingUpdateModal)
    document.getElementById('shopping_submit_update').addEventListener('click', updateItem)
}

function hideShoppingModal () {
    event.preventDefault()
    document.getElementById('shopping_modal').style.display = 'none'
    document.getElementById('background_for_modal').style.display = 'none'
}

function hideShoppingUpdateModal () {
    event.preventDefault()
    document.getElementById('shopping_modal_update').style.display = 'none'
    document.getElementById('background_for_modal').style.display = 'none'
}

function addShoppingItem () {
    event.preventDefault()
    // get the value from the input
    const name = document.getElementById('shopping_name').value
    const quantity = document.getElementById('shopping_quantity').value
    const category = document.getElementById('shopping_category').value

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
              <span class="remove-button">❌</span>
          </li>
      `
    client.shopping.create(shoppingList, name, quantity, category)
    addEvents()
    hideShoppingModal()
}

function addEvents () {
    const updateButtons = document.getElementsByClassName('update')
    const updateButton = updateButtons[updateButtons.length - 1]

    updateButton.addEventListener('click', () => {
        const modal = document.getElementById('shopping_modal_update')
        modal.style.display = 'flex'
        document.getElementById('background_for_modal').style.display = 'flex'
        updatingItem = updateButton.parentNode.parentNode
        console.log(updatingItem)
    })

    const removeButtons = document.getElementsByClassName('remove-button')
    const removeButton = removeButtons[removeButtons.length - 1]

    removeButton.addEventListener('click', () => { removeShoppingItem(removeButton) })
}

function updateItem (button) {
    event.preventDefault()
    // get the value from the input
    const prevName = updatingItem.innerHTML.split('>')[2].split('<')[0]
    console.log(prevName)
    const name = document.getElementById('shopping_name_update').value
    const quantity = document.getElementById('shopping_quantity_update').value
    const category = document.getElementById('shopping_category_update').value

    if (!name || !quantity || !category) {
        return alert('name or quantity or category can not be empty!')
    }

    if (!client.shopping.update(shoppingList, prevName, name, quantity, category)) {
        return alert('Item with the same name already existed. Please consider updating that item.')
    }

    updatingItem.children[1].innerText = name
    updatingItem.children[2].innerText = 'quantity: ' + quantity
    updatingItem.children[3].innerText = 'category: ' + category
    hideShoppingUpdateModal()
}

function removeShoppingItem (button) {
    const item = button.parentNode
    const name = item.innerHTML.split('>')[2].split('<')[0]
    item.parentNode.removeChild(item)
    client.shopping.delete(shoppingList, name)
}
