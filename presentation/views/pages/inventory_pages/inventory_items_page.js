import { baseUrl } from "../../../constants.js";
import { xml_req } from "../../../js/utils.js";
import { createIntent, pathNavigator } from "../../../plugins/xena_ui/js/components/shared/shared_utilities.js";
import { PageController } from "../../../plugins/xena_ui/js/controllers/page_controller.js";
import { inventoryMainSubFrame } from "../../subframes/inventory_subframes/inventory_main_subframe.js";
import { inventoryEditItemsPage } from "./edit_inventory_items_page.js";

const controller = new PageController();

export const inventoryItemsPage = controller.createPage(inventoryMainSubFrame,"List Items Page",(self,body)=>{

    body.innerHTML = `<h4>Items</h4>
    <table id="item_table" style="width: 100%; border-collapse: collapse; table-layout: fixed;">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Qty</td>
                    <td>Total</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
            </thead>
            <tbody>
               
            </tbody>
        </table>
    `;

    fetch(baseUrl+"get/items",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res=>{
        res.json().then(items => {
            const tbody = body.querySelector('tbody');

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const _id = item["_id"];
                const price = item["price"];
                const quantity = item["quantity"]

                const doc = document.createElement('tr');

                doc.innerHTML = `
                    <td>${item["name"]}</td>
                    <td>$${price}</td>
                    <td>${quantity}</td>
                    <td>$${price * quantity}</td>
                    <td><button id="edit_btn">Edit</button></td>
                    <td><button id="delete_btn">Delete</button></td>
                `
                const editBtn = doc.querySelector(`#edit_btn`);
                editBtn.onclick = (e) =>{
                    pathNavigator(inventoryEditItemsPage,createIntent("item",item));
                }

                const deleteBtn = doc.querySelector(`#delete_btn`);
                deleteBtn.onclick = (e) =>{
                    

                    fetch(baseUrl+`delete/items/${_id}`,{
                        method:"DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }).then(res => {
                        tbody.removeChild(doc);
                    }).catch(err => {
                        console.error(err);
                    })

                }

                tbody.appendChild(doc)
            }
        })
    }).catch(err=>{
        console.error(err);
    });

});