export default function (inventoryList, name, quantity, category) {
    if (!inventoryList[category]) inventoryList[category] = []
    inventoryList[category].push({ name, quantity, category })
    localStorage.setItem('inventoryList', JSON.stringify(inventoryList))
}
