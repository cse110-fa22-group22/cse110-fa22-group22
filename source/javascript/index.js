import create from './shopping/create.js'
// import update from './shopping/update.js'
// import remove from './shopping/delete.js' // delete is a keyword

const shoppingList = []
// const inventoryList = {}
const client = {}

client.shopping = {
    create
    // update,
    // delete: remove
}

window.addEventListener('DOMContentLoaded', init)

// put all eventlisteners here
function init () {
    window.onclick = function (event) {
        const modal = document.getElementById('shopping_modal')
        if (event.target === modal) {
            modal.style.display = 'none'
        }
    }

    document.getElementById('shopping_add').addEventListener('click', () => {
        const modal = document.getElementById('shopping_modal')
        modal.style.display = 'flex'
    })

    document.getElementById('shopping_cancel').addEventListener('click', hideShoppingModal)
    document.getElementById('shopping_submit').addEventListener('click', addShoppingItem)
}

function hideShoppingModal () {
    document.getElementById('shopping_modal').style.display = 'none'
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

function getItemName (element) {
    const parent = element.parentNode
    return parent.innerHTML.split('>')[2].split('<')[0]
}

function addEvents () {
    const removeButtons = document.getElementsByClassName('remove-button')
    const removeButton = removeButtons[removeButtons.length - 1]

    removeButton.addEventListener('click', () => { removeShoppingItem(getItemName(removeButton)) })
}

function removeShoppingItem (item) {
    // delete(shoppingList, item)
    // refreshPage()
}
