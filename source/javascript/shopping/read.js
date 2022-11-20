export default function (shoppingList, list) {
    const shoppingListFromStorage = JSON.parse(localStorage.getItem('shoppingList'))
    if (shoppingListFromStorage != null) {
        for (const item of shoppingList) {
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
