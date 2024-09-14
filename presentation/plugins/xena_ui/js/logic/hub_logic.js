// import { FrameLogic } from "./frame_logic.js";

export class HubLogic{

    static getFrames(hub){
        return hub.data["frames"];
    }

    static getCurrentFrame(hub){
        return hub.data["currentFrame"];
    }

    static setCurrentFrame(hub,frame){

        if(hub.data["currentFrame"] == frame){
            // throw new Error(`Failed to set current frame. Current frame is already set to ${frame.data["id"]}`);
            return;
        }

        hub.data["currentFrame"] = frame;
    }

    static registerFrame(hub,frame){
        const frames = hub.data["frames"];
        const exists = frames.includes(frame);
        
        if(exists){
            throw new Error(`Frame ${frame.data["id"]} is already registered`);
        }

        frames.push(frame);

        return frames;
    }

    static deRegisterFrame(hub,frame){
        const frames = hub.data["frames"];
        const index = frames.indexOf(frame);
        
        if(index < 0){
            throw new Error(`Frame ${frame.data["id"]} is not registered`);
        }

        frames.splice(index,1);

        return frames;
    }

    static refresh(hub){
        const rendered = hub.data["rendered"];

        if(!rendered){
            throw new Error("Failed to refresh");
        }

        this.render(hub);
    }

    static refresh(hub){
        return this.render(hub);
    }

    static render(hub){
        const parentElement = hub.data["parentElement"];
        const currentFrame = this.getCurrentFrame(hub);

        if(!parentElement){
            throw new Error("Failed to render. Please set parent DOM element");
        }

        if(!currentFrame){
            throw new Error("Failed to render. Please set current frame");
        }

        parentElement.innerHTML = "";
        parentElement.appendChild(currentFrame.data["body"]);

        hub.data["rendered"] = true;

        return parentElement;
    }
}