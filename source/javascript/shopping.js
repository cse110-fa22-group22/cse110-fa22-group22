module.exports = class Utils {
    static create(shopping, name, quantity, category){
        shopping.push({name: name, quantity: quantity, category: category});
        // add to localStorage
    }

    static update(shopping, name, quantity, category){
        
    }

    static remove(shopping, name){

    }
}
