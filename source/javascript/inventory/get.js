export default function (inventoryList, name, category) {
    if (!inventoryList[category]) { return false }
    const arr = inventoryList[category]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.toLowerCase() === name.toLowerCase()) {
            return true
        }
    }
    return false
}
