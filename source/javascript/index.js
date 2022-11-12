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

/*creat */ 
//show the dialog box
export function show_add(){
    document.getElementById("add_item").show();
}

//input for the dialog box and close it, creat item
export function dialog_add(){
    //get the value from the input 
    const name = document.getElementById("item").value; 
    const num = document.getElementById("num_item").value; 
    const cate = document.getElementById("cate").value; 

    console.log(name,num,cate);

    //check the input is null or not
    if((name != null && name != "")&&(num != null && num != "")&&(cate != null && cate != "")){
        // creat item
        var ul = document.getElementById("add_list");
        var items = ul.getElementsByTagName("li");
        for (var i = 0; i < items.length; ++i) {
            if(items[i].innerHTML == `Product ${i+1}`){
                items[i].innerHTML = '';
                //creat a check box
                let check_box = document.createElement("input");
                check_box.type = 'checkbox';
                check_box.className = "check_box";
                items[i].appendChild(check_box);
                
                //Create the item description
                //add item name
                let p_name_0 = document.createElement("span");
                p_name_0.innerHTML  = ` | item name: `;
                items[i].appendChild(p_name_0);
                let p_name = document.createElement("span");
                p_name.innerHTML  = `${name}`;
                items[i].appendChild(p_name);
   
                //add item number
                let p_num_0 = document.createElement("span");
                p_num_0.innerHTML  = ` | item number: `;
                items[i].appendChild(p_num_0);
                let p_num = document.createElement("span");
                p_num.innerHTML  = `${num}`;
                items[i].appendChild(p_num);

                //add item category
                let p_cate_0 = document.createElement("span");
                p_cate_0.innerHTML  = ` | category: `;
                items[i].appendChild(p_cate_0);
                let p_cate = document.createElement("span");
                p_cate.innerHTML  = `${cate}`;
                items[i].appendChild(p_cate);


                //items[i].innerHTML = `Product ${i+1} | Name: ${name} | Number: ${num} | Category: ${cate}  `;

                //creat a edit button 
                let btn_edit = document.createElement("button");
                btn_edit.innerHTML = "Edit";
                btn_edit.className = "edit_Btn"
                items[i].appendChild(btn_edit);

                //creat a delete buttom
                let btn_dele = document.createElement("button");
                btn_dele.innerHTML = "Delete";
                btn_dele.className = "dele_Btn"
                items[i].appendChild(btn_dele);
                break;
            }
        
        }
        document.getElementById("add_item").close();
    }
    else{
        alert("item name or number or category can't be empty");
    }

}

//close  the dialog 
export function dialog_cancle(){
    document.getElementById("add_item").close();
}


document.getElementById("add_but").addEventListener("click", show_add);

document.getElementById("itme_cancel").addEventListener("click", dialog_cancle);

document.getElementById("itme_ok").addEventListener("click", dialog_add);

