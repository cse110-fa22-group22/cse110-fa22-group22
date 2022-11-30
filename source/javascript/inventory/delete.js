export default function (inventoryList, name, category) {
    var cat = inventoryList[category]
    if(cat === undefined) {return false}
    for(var i = 0; i < cat.length; i++) {
        if(name === cat[i].name) {
            cat.splice(i, 1)
            if(cat.length === 0) { delete inventoryList[category]}
            else { inventoryList[category] = cat}
            localStorage.setItem('inventoryList', JSON.stringify(inventoryList))
            return true
        }
    }
    return false
}