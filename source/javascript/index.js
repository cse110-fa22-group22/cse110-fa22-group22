let client = {
    shopList: [],
    invList: {},
};

client.shopping = {
    create: require('./shopping/create.js'),
    update: require('./shopping/update.js'),
    delete: require('./shopping/delete.js'),
}


// let button = document.getElementById();
// button.addEventListener('click', ()=>{ client.shopping.create(client.shopList, name, quantity, category); })
// client.shopping.create(client.shopList, name, quantity, category);

