export default function (inventoryList, prevName, prevCategory, name, quantity, category) {
    if (prevName !== name && inventoryList[category]) {
        for (let i = 0; i < inventoryList[category].length; i++) {
            if (inventoryList[prevCategory][i].name === name) {
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
