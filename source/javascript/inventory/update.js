import create from '../inventory/create.js'

export default function (inventoryList, prevName, prevCategory, vname, quantity, category) {
    const inventoryCategory = inventoryList[prevCategory]
    let copyInventoryList = JSON.stringify(inventoryList)
    let itemRemoved = []
    for (const item of inventoryCategory) {
        if (item.name !== prevName) {
            itemRemoved += JSON.stringify(item)
        }
    }
    inventoryList[prevCategory] = itemRemoved
    if (itemRemoved.length === 0) {
        delete inventoryList[prevCategory]
        // copyInventoryList = JSON.stringify(inventoryList)
        // const copyInventoryListPart1 = copyInventoryList.substring(0, copyInventoryList.indexOf(prevCategory) - 1)
        // const copyInventoryListPart2 = copyInventoryList.substring(copyInventoryList.indexOf('[],') + 3)
        // inventoryList = JSON.parse(copyInventoryListPart1 + copyInventoryListPart2)
    }
    const name = vname
    create(inventoryList, name, quantity, category)
    return true
}
