export default function (inventoryList, name, quantity, category) {
    if (!inventoryList[category]) inventoryList[category] = []
    else {
        const arr = inventoryList[category]
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i])
            if (arr[i].name === name) {
                return false
            }
        }
    }
    inventoryList[category].push({ name, quantity, category })
    localStorage.setItem('inventoryList', JSON.stringify(inventoryList))
    return true
}
