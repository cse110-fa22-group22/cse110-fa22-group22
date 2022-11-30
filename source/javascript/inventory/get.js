export default function (inventoryList, name, category) {
    if (!inventoryList[category]) { return false }
    const arr = inventoryList[category]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.tolowerCase() === name.tolowerCase()) {
            return true
        }
    }
    return false
}
