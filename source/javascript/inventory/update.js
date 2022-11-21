export default function (inventoryList, prevName, prevCategory, vname, quantity, category) {
    const itemRemoved = inventoryList[prevCategory].filter((item) => {
        return item.name !== prevName
    })
    localStorage.setItem('inventoryList', JSON.stringify(inventoryList))
}
