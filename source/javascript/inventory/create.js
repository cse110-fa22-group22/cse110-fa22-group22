
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
