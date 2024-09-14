import { pathNavigator } from "../../../plugins/xena_ui/js/components/shared/shared_utilities.js";
import { SubFrameController } from "../../../plugins/xena_ui/js/controllers/sub_frame_controller.js";
import { SubFrameLogic } from "../../../plugins/xena_ui/js/logic/sub_frame_logic.js";
import { inventoryFrame } from "../../frames/inventory.js";

const controller = new SubFrameController();

export const inventoryMainSubFrame = controller.createSubFrame(inventoryFrame,(self,body,page)=>{
    
    body.style = "height: 90%; overflow-y: scroll;"

    if (page) {
        body.appendChild(page.getBody())
    }
});