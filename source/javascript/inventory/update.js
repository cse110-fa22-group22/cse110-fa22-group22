/**
 * @param {*} inventoryList array of existing inventory items
 * @param {*} prevName name of the to be update item
 * @param {*} prevCategory category of the to be update item
 * @param {*} name name of update item
 * @param {*} quantity quantity of the update item
 * @param {*} category category of update item
 * @returns true if the item is successfully updated, return false otherwise
 */
export default function (inventoryList, prevName, prevCategory, name, quantity, category) {
    if (prevName.toLowerCase() !== name.toLowerCase() && inventoryList[category]) {
        for (let i = 0; i < inventoryList[category].length; i++) {
            if (inventoryList[prevCategory][i].name.toLowerCase() === name.toLowerCase()) {
                return false
            }
        }
    }
    if (prevCategory === category) {
        for (let i = 0; i < inventoryList[prevCategory].length; i++) {
            if (inventoryList[prevCategory][i].name === prevName) {
                inventoryList[prevCategory][i].name = name
                inventoryList[prevCategory][i].quantity = quantity
                inventoryList[prevCategory][i].category = category
            }
        }
    } else {
        for (let i = 0; i < inventoryList[prevCategory].length; i++) {
            if (inventoryList[prevCategory][i].name === prevName) {
                inventoryList[prevCategory].splice(i, 1)
                break
            }
        }
        if (inventoryList[prevCategory].length === 0) {
            delete inventoryList[prevCategory]
        }
        if (!inventoryList[category]) inventoryList[category] = []
        inventoryList[category].push({ name, quantity, category })
    }
    localStorage.setItem('inventoryList', JSON.stringify(inventoryList))
    return true
}
