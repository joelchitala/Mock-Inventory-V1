import { FrameController } from "../../plugins/xena_ui/js/controllers/frame_controller.js";

export const frameController = new FrameController();

export const ordersFrame = frameController.createFrame((self,body,subFrame)=>{
    body.innerHTML = `<h1>Orders</h1>`;
});