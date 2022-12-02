/**
 * Deletes the item matching the name and category from inventoryList and updates localStorage
 * @param {*} inventoryList list of all the categories and items in the categories
 * @param {*} name the name of the item that is to be deleted
 * @param {*} category the category of the item
 * @returns true if the item is deleted and false otherwise
 */
export default function (inventoryList, name, category) {
    const cat = inventoryList[category]
    if (cat === undefined) { return false }
    for (let i = 0; i < cat.length; i++) {
        if (name.toLowerCase() === cat[i].name.toLowerCase()) {
            cat.splice(i, 1)
            if (cat.length === 0) {
                delete inventoryList[category]
            } else {
                inventoryList[category] = cat
            }
            localStorage.setItem('inventoryList', JSON.stringify(inventoryList))
            return true
        }
    }
    return false
}
