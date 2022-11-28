
export default function (inventoryList, name, quantity, category) {
    if (!inventoryList[category]) inventoryList[category] = []
    else {
        for (const item in inventoryList[category]) {
            if (item.name === name) {
                return false
            }
        }
    }
    inventoryList[category].push({ name, quantity, category })
    localStorage.setItem('inventoryList', JSON.stringify(inventoryList))
    return true
}
