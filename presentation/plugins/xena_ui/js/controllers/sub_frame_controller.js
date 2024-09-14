import { DEREGISTERED_SUBFRAME, GOTO_PAGE, REGISTERED_SUBFRAME, RENDER_SUBFRAME, RERENDER_SUBFRAME } from "../components/shared/commands.js";
import { SubFrame } from "../components/src/sub_frame/sub_frame.js";
import { FrameLogic } from "../logic/frame_logic.js";
import { SubFrameLogic } from "../logic/sub_frame_logic.js";
import { BaseController } from "./base_controller.js";
import { PageController } from "./page_controller.js";

export class SubFrameController extends BaseController {
    constructor() {
        super();
    }

    createSubFrame(frame,template = (self,body,page) =>{}){
        let subFrame;

        try {
            subFrame = new SubFrame();
            SubFrameLogic.setTemplate(subFrame,template);

            FrameLogic.registerSubFrame(frame,subFrame);
            subFrame.data["frame"] = frame;

            if(frame.data.currentSubFrame == null){
                frame.data.currentSubFrame = subFrame;
            }

            this.emit(REGISTERED_SUBFRAME,{"hub":this.hub,"frame":frame,"subFrame":subFrame});
        } catch (error) {
            console.error(error);
        }

        return subFrame;
    }

    deleteSubFrame(frame,subFrame){
        try {
            const subFrames = FrameLogic.deRegisterSubFrame(this.hub,subFrame);

            subFrame.data["frame"] = null;

            this.emit(DEREGISTERED_SUBFRAME,{"hub":this.hub,"frame":frame, "subFrame":subFrame});
            return subFrames;
        } catch (error) {
            console.error(error);
        }

        return FrameLogic.getSubFrames(frame);
    }

    gotoPage(subFrame,page){
        try {

            if(page == SubFrameLogic.getCurrentPage(subFrame)){
                return;
            }

            const frame = subFrame.data["frame"];
            SubFrameLogic.setCurrentPage(subFrame,page);
            this.render(subFrame);
            this.emit(GOTO_PAGE,{"hub":this.hub,"frame":frame,"subFrame":subFrame,"page":page});
        } catch (error) {
            console.error(error);
        }

        return SubFrameLogic.getCurrentPage(subFrame);
    }

    refresh(subFrame){
        try {
            SubFrameLogic.refresh(subFrame); 
            new PageController().refresh(SubFrameLogic.getCurrentPage(subFrame))
        } catch (error) {
            console.error(error);
        }
    }

    refreshCurrentPage(subFrame){
        try {
            new PageController().refresh(SubFrameLogic.getCurrentPage(subFrame))
        } catch (error) {
            console.error(error);
        }
    }

    render(subFrame){
        if(!subFrame){
            return;
        }
        try {
            const frame = subFrame.data["frame"];
            SubFrameLogic.render(subFrame);
            new PageController().render(SubFrameLogic.getCurrentPage(subFrame));
            this.emit(RENDER_SUBFRAME,{"hub":this.hub,"frame":frame,"subFrame":subFrame});
        } catch (error) {
            console.error(error);
        }
    }
}