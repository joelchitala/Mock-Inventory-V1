import { baseUrl } from "../../../constants.js";
import { pathNavigator } from "../../../plugins/xena_ui/js/components/shared/shared_utilities.js";
import { PageController } from "../../../plugins/xena_ui/js/controllers/page_controller.js";
import { inventoryMainSubFrame } from "../../subframes/inventory_subframes/inventory_main_subframe.js";
import { inventoryItemsPage } from "./inventory_items_page.js";

const controller = new PageController();

export const inventoryAddItemsPage = controller.createPage(inventoryMainSubFrame,"Add Items Page",(self,body)=>{
    
    body.innerHTML = `<h4>Add Item</h4>`

    const form = document.createElement("form")

    const str = `
        <input-tag label="Name" name="name" ></input-tag>
        <input-tag label="Price" name="price" type="number" ></input-tag>
        <input-tag label="Quantity" name="quantity" type="number" ></input-tag>
        <button type="button">Add Item</button>
    `
    form.innerHTML = str

    const btn = form.querySelector("button")

    btn.onclick = (e) =>{

        var formData = new FormData(form);
        const jsonData = {};
    
        for (let [key, value] of formData.entries()) {
            const float = parseFloat(value);
            if(float){
                jsonData[key] = float;
                continue;
            }
            jsonData[key] = value;
        }


        fetch(baseUrl+`collection/items`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([jsonData]),
        }).then(res => {
            pathNavigator(inventoryItemsPage);
        }).catch(err => {
            console.error(err);
        })

    }

    body.appendChild(form);

});