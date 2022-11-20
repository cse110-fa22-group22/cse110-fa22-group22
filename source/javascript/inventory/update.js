export default function (inventoryList, prevName, prevCategory, vname, quantity, category) {
    const itemRemoved = inventoryList[category].filter()
    if (!inventoryList[category]) inventoryList[category] = []
    inventoryList[category].push({ name, quantity, category })
    localStorage.setItem('inventoryList', JSON.stringify(inventoryList))
}