import create from '../inventory/create.js'

export default function (inventoryList, prevName, prevCategory, vname, quantity, category) {
    const inventoryCategory = inventoryList[prevCategory]
    let itemRemoved = []
    for (const item of inventoryCategory) {
        if (item.name !== prevName) {
            itemRemoved += JSON.stringify(item)
        }
    }
    inventoryList[prevCategory] = itemRemoved
    if (itemRemoved.length === 0) {
        delete inventoryList[prevCategory]
    }
    const name = vname
    create(inventoryList, name, quantity, category)
    return true
}
