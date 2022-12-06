/**
 * Add new item to inventory list and update localStorage
 * @param {*} inventoryList array of existing inventory items
 * @param {*} name name of new item
 * @param {*} quantity quantity of new item
 * @param {*} category category of new item
 * @returns false if there exist item with same name in inventory list, true otherwise
 */
export default function (inventoryList, name, quantity, category) {
    if (!inventoryList[category]) inventoryList[category] = []
    else {
        const arr = inventoryList[category]
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name.toLowerCase() === name.toLowerCase()) {
                return false
            }
        }
    }
    inventoryList[category].push({ name, quantity, category })
    localStorage.setItem('inventoryList', JSON.stringify(inventoryList))
    return true
}
