import { GOTO_FRAME, RENDER_HUB } from "../components/shared/commands.js";
import { HubLogic } from "../logic/hub_logic.js";
import { BaseController } from "./base_controller.js";
import { FrameController } from "./frame_controller.js";

export class HubController extends BaseController{
    constructor() {
        super();
    }

    goToFrame(frame){
        try {
            HubLogic.setCurrentFrame(this.hub,frame);
            this.render()
            this.emit(GOTO_FRAME,{"hub":this.hub,"frame":frame});
        } catch (error) {
            console.error(error);
        }

        return HubLogic.getCurrentFrame(this.hub);
    }

    render(){
        try {
            HubLogic.render(this.hub);
            new FrameController().render(HubLogic.getCurrentFrame(this.hub));
            this.emit(RENDER_HUB,{"hub":this.hub});
        } catch (error) {
            console.error(error);
        }
    }
}