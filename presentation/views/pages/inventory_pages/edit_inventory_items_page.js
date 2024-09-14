import { baseUrl } from "../../../constants.js";
import { compareTwoDict } from "../../../js/utils.js";
import { generatePath, pathNavigator } from "../../../plugins/xena_ui/js/components/shared/shared_utilities.js";
import { FrameController } from "../../../plugins/xena_ui/js/controllers/frame_controller.js";
import { PageController } from "../../../plugins/xena_ui/js/controllers/page_controller.js";
import { inventoryEditSubFrame } from "../../subframes/inventory_subframes/inventory_edit_subframe.js";

const controller = new PageController();

export const inventoryEditItemsPage = controller.createPage(inventoryEditSubFrame,"Edit Items Page",(self,body)=>{
    const intent = self.getIntent('item');

    if(!intent){
        const frame = generatePath(self)["path"]["frame"];
        new FrameController().popSubFrame(frame);
        return;
    }
    
    body.innerHTML = `<h4>Edit Item</h4>`

    const data = intent["payload"];

    const form = document.createElement("form")

    const str = `
        <input-tag label="Name" name="name" value="${data["name"]}"></input-tag>
        <input-tag label="Price" name="price" type="number" value="${data["price"]}"></input-tag>
        <input-tag label="Quantity" name="quantity" type="number" value="${data["quantity"]}"></input-tag>
        <button type="button">Update Item</button>
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

        fetch(baseUrl+`update/items/${data["_id"]}`,{
            method:"PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        }).then(res => {
            // console.log(res);

            new FrameController().popSubFrame(self["data"]["subFrame"]["data"]["frame"]);
        }).catch(err => {
            console.error(err);
        })

    }

    body.appendChild(form);

});