import { SubFrameController } from "../../../plugins/xena_ui/js/controllers/sub_frame_controller.js";
import { inventoryFrame } from "../../frames/inventory.js";

const controller = new SubFrameController();

export const inventoryEditSubFrame = controller.createSubFrame(inventoryFrame,(self,body,page)=>{
    if (page) {
        body.appendChild(page.getBody())
    }
});