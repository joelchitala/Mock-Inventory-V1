import "./js/custom_components.js";
import { pathNavigator } from "./plugins/xena_ui/js/components/shared/shared_utilities.js";
import { Hub } from "./plugins/xena_ui/js/components/src/hub/hub.js";
import { HubController } from "./plugins/xena_ui/js/controllers/hub_controller.js";
import { inventoryFrame } from "./views/frames/inventory.js";
import { ordersFrame } from "./views/frames/orders.js";
import { inventoryItemsPage } from "./views/pages/inventory_pages/inventory_items_page.js";
import { inventoryAddItemsPage } from "./views/pages/inventory_pages/add_inventory_items_page.js";
import { inventoryEditSubFrame } from "./views/subframes/inventory_subframes/inventory_edit_subframe.js";
import { inventoryMainSubFrame } from "./views/subframes/inventory_subframes/inventory_main_subframe.js";


const sidebar_selection_container = document.querySelector("#sidebar_selection_container");
const content_section = document.querySelector("#content_section");

const hub = new Hub();
hub.setParentElement(content_section)

const hubController = new HubController();


for (let i = 0; i < sidebar_selection_container.children.length; i++) {
    const child = sidebar_selection_container.children[i];
    
    const dataFrame = child.attributes["data-frame"].value;

    child.onclick = (e) =>{
        switch (dataFrame) {
            case "inventory":
                pathNavigator(inventoryFrame);
                break;
            case "orders":
                pathNavigator(ordersFrame);
                break;
            default:
                break;
        }
    } 
    
}


hubController.render();





