import create from './shopping/create.js'
import update from './shopping/update.js'
import remove from './shopping/delete.js' // delete is a keyword

const shoppingList = []
// const inventoryList = {}
const client = {}

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
        if (event.target === modal) {
            modal.style.display = 'none'
        }
        if (event.target === updateModal) {
            updateModal.style.display = 'none'
        }
    }

    document.getElementById('shopping_add').addEventListener('click', () => {
        const modal = document.getElementById('shopping_modal')
        modal.style.display = 'flex'
    })

    document.getElementById('shopping_cancel').addEventListener('click', hideShoppingModal)
    document.getElementById('shopping_submit').addEventListener('click', addShoppingItem)
    document.getElementById('shopping_cancel_update').addEventListener('click', hideShoppingUpdateModal)
    document.getElementById('shopping_submit_update').addEventListener('click', updateItem)
}

function hideShoppingModal () {
    event.preventDefault()
    document.getElementById('shopping_modal').style.display = 'none'
}

function hideShoppingUpdateModal () {
    event.preventDefault()
    document.getElementById('shopping_modal_update').style.display = 'none'
}

function addShoppingItem () {
    event.preventDefault()
    // get the value from the input
    const name = document.getElementById('shopping_name').value
    const quanity = document.getElementById('shopping_quantity').value
    const category = document.getElementById('shopping_category').value

    if (!name || !quanity || !category) {
        return
    }

    if (!client.shopping.create(shoppingList, name, quanity, category)) {
        return alert('Item with the same name already existed. Please consider updating the item.')
    }

    const list = document.getElementById('shopping_list')
    list.innerHTML += `
          <li>
              <input type="checkbox">
              <span class="name">${name}</span> | 
              <span class="quantity">quantity: ${quanity}</span> | 
              <span class="category">${category} </span>
              <span><button class="update">update</button></span>
              <span class="remove-button">X</span>
          </li>
      `
    client.shopping.create(shoppingList, name, quanity, category)
    addEvents()
    hideShoppingModal()
}

function addEvents () {
    const updateButtons = document.getElementsByClassName('update')
    const updateButton = updateButtons[updateButtons.length - 1]

    updateButton.addEventListener('click', () => {
        const modal = document.getElementById('shopping_modal_update')
        modal.style.display = 'flex'
    })

    const removeButtons = document.getElementsByClassName('remove-button')
    const removeButton = removeButtons[removeButtons.length - 1]

    removeButton.addEventListener('click', () => { removeShoppingItem(removeButton) })
}

function updateItem (button) {
    event.preventDefault()
    // get the value from the input
    const name = document.getElementById('shopping_name_update').value
    const quantity = document.getElementById('shopping_quantity_update').value
    const category = document.getElementById('shopping_category_update').value

    if (!name || !quantity || !category) {
        return
    }

    if (!client.shopping.update(shoppingList, name, quantity, category)) {
        return alert('Item with the same name already existed. Please consider updating that item.')
    }

    const item = button.parentNode
    item.child[1] = name
    item.child[2] = quantity
    item.child[3] = category
    hideShoppingUpdateModal()
}

function removeShoppingItem (button) {
    const item = button.parentNode
    const name = item.innerHTML.split('>')[2].split('<')[0]
    item.parentNode.removeChild(item)
    // delete(shoppingList, name)
}
