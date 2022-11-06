import create from './shopping/create.js';
import update from './shopping/update.js';
import remove from './shopping/delete.js'; // delete is a keyword
import test from './shopping/test.js';

let client = {
    shopList: [],
    invList: {},
};

client.shopping = {
    create: create,
    update: update,
    delete: remove,
    test: test
}

client.shopping.test("hello");