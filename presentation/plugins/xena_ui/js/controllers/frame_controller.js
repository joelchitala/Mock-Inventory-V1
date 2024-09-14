import { DEREGISTERED_FRAME, GOTO_SUBFRAME, POP_SUBFRAME, REGISTERED_FRAME, RENDER_FRAME, RERENDER_FRAME } from "../components/shared/commands.js";
import { Frame } from "../components/src/frame/frame.js";
import { FrameLogic } from "../logic/frame_logic.js";
import { HubLogic } from "../logic/hub_logic.js";
import { BaseController } from "./base_controller.js";
import { HubController } from "./hub_controller.js";
import { SubFrameController } from "./sub_frame_controller.js";

export class FrameController extends BaseController {
    constructor() {
        super();
    }

    createFrame(template = (self,body,subFrame) =>{}){
        let frame;

        try {
            frame = new Frame();
            
            HubLogic.registerFrame(this.hub,frame);

            FrameLogic.setTemplate(frame,template);

            if(this.hub.data.currentFrame == null){
                this.hub.data.currentFrame = frame;
            }

            this.emit(REGISTERED_FRAME,{"hub":this.hub,"frame":frame});
        } catch (error) {
            console.error(error);
        }

        return frame;
    }

    deleteFrame(frame){
        try {
            const frames = HubLogic.deRegisterFrame(this.hub,frame);

            this.emit(DEREGISTERED_FRAME,{"hub":this.hub,"frame":frame});
            return frames;
        } catch (error) {
            console.error(error);
        }

        return this.hub.data.frames;
    }

    pushSubFrame(frame){
        try {
            const initialSubFrame = FrameLogic.getCurrentSubFrame(frame);

            const forwardStack = FrameLogic.getForwardStack(frame);
            const currentSubFrame = forwardStack[forwardStack.length - 1];

            if(!currentSubFrame){
                return forwardStack;
            }

            FrameLogic.appendToHistoryStack(frame,initialSubFrame);
            FrameLogic.removeFromForwardStack(frame,currentSubFrame);
            FrameLogic.setCurrentSubFrame(frame,currentSubFrame);

            this.render(frame);
            this.emit(POP_SUBFRAME,{"hub":this.hub,"frame":frame,"initialSubFrame":initialSubFrame, "currentSubFrame": currentSubFrame});
        } catch (error) {
            console.error(error);
        }

        return FrameLogic.getForwardStack(frame);
    }
    
    popSubFrame(frame){
        try {
            const initialSubFrame = FrameLogic.getCurrentSubFrame(frame);

            const historyStack = FrameLogic.getHistoryStack(frame);
            const currentSubFrame = historyStack[historyStack.length - 1];

            if(!currentSubFrame){
                return historyStack;
            }

            FrameLogic.appendToForwardStack(frame,initialSubFrame)
            FrameLogic.removeFromHistoryStack(frame,currentSubFrame);
            FrameLogic.setCurrentSubFrame(frame,currentSubFrame);

            this.render(frame);
            this.emit(POP_SUBFRAME,{"hub":this.hub,"frame":frame,"initialSubFrame":initialSubFrame, "currentSubFrame": currentSubFrame});
        } catch (error) {
            console.error(error);
        }

        return FrameLogic.getHistoryStack(frame);
    }

    goToSubFrame(frame,subFrame){
        try {
            const currentSubFrame = FrameLogic.getCurrentSubFrame(frame);

            if(currentSubFrame == subFrame){
                return;
            }

            FrameLogic.appendToHistoryStack(frame,currentSubFrame);
            FrameLogic.resetForwardStack(frame);

            FrameLogic.setCurrentSubFrame(frame,subFrame);
            
            this.render(frame);
            this.emit(GOTO_SUBFRAME,{"hub":this.hub,"frame":frame,"subFrame":subFrame, "prevSubFrame":currentSubFrame});
        } catch (error) {
            console.error(error);
        }

        return FrameLogic.getCurrentSubFrame(frame);
    }

    refresh(frame){
        try {
            FrameLogic.refresh(frame);           
        } catch (error) {
            console.error(error);
        }
    }

    render(frame){
        if(!frame){
            return;
        }
        try {
            FrameLogic.render(frame);
            new SubFrameController().render(FrameLogic.getCurrentSubFrame(frame));
            this.emit(RENDER_FRAME,{"hub":this.hub,"frame":frame});
        } catch (error) {
            console.error(error);
        }
    }
}