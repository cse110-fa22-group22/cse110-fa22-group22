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
    readItemFromStorage()
    document.querySelectorAll('.update').forEach((update) => {
        update.addEventListener('click', (event) => {
            document.getElementById('shopping_modal').style.display = 'flex'
            console.log(event.target.parentNode.parentNode.getElementsByTagName('span')[0].textContent)
        })
    })
}

function hideShoppingModal () {
    event.preventDefault()
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
    const removeButtons = document.getElementsByClassName('remove-button')
    const removeButton = removeButtons[removeButtons.length - 1]

    removeButton.addEventListener('click', () => { removeShoppingItem(removeButton) })
}

function removeShoppingItem (button) {
    const item = button.parentNode
    const name = item.innerHTML.split('>')[2].split('<')[0]
    item.parentNode.removeChild(item)
    // delete(shoppingList, name)
}

function readItemFromStorage () {
    const test = JSON.parse(localStorage.getItem('shoppingList'))
    let name
    let quanity
    let category
    const list = document.getElementById('shopping_list')
    if (test != null) {
        for (const item of test) {
            list.innerHTML += `
  <li>
      <input type="checkbox">
      <span>${item.name}</span> | <span>quantity: ${item.quantity}</span> | <span>${item.category} </span><span><button class = 'update'>update</button></span>
      <span>X</span>
  </li>
  `
            shoppingList.push({ name: item.name, quantity: item.quantity, category: item.category })
        }
    }
}
