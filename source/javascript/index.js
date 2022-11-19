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
              <span>${name}</span> | <span>quantity: ${quanity}</span> | <span>${category} </span><span><button>update</button></span>
              <span>X</span>
          </li>
      `
    client.shopping.create(shoppingList, name, quanity, category)

    hideShoppingModal()
}
