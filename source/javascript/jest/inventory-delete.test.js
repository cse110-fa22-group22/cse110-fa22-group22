import create from '../inventory/create.js'
import update from '../inventory/update.js'
import invDelete from '../inventory/delete.js'

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
}
  
global.localStorage = new LocalStorageMock;