import { FrameController } from "../../controllers/frame_controller.js";
import { HubController } from "../../controllers/hub_controller.js";
import { PageController } from "../../controllers/page_controller.js";
import { SubFrameController } from "../../controllers/sub_frame_controller.js";
import { Intent } from "../src/intents/intent.js";
import { ENTITYTYPES } from "./base_component.js";

export const pathNavigator = (component,intent) =>{

    if(!component){
        throw new Error("Component can not be null or undefined");
    }

    if(!component["data"]["entityType"]){
        throw new Error("Component is not a valid object");
    }

    
    switch (component["data"]["entityType"]) {
        case ENTITYTYPES.FRAME:{
            const hub_controller = new HubController();
            hub_controller.goToFrame(component);
        }
        break;

        case ENTITYTYPES.SUBFRAME:{
            const frame_controller = new FrameController();
            const frame = component["data"]["frame"];

            if(!frame){
                throw new Error(`Frame not found for compenent. ${component["data"]}`);
            }

            frame_controller.goToSubFrame(frame,component);
        }  
        break;
        case ENTITYTYPES.PAGE:{
            const frame_controller = new FrameController();
            const subFrame_controller = new SubFrameController();
            const subFrame = component["data"]["subFrame"];
            const frame = subFrame["data"]["frame"];

            if(!subFrame){
                throw new Error(`SubFrame not found for compenent. ${component["data"]}`);
            }

            if(!frame){
                throw new Error(`Frame not found for compenent. ${component["data"]}`);
            }
            
            if(intent){
                if(intent["data"]["entityType"] != ENTITYTYPES.INTENT){
                    throw new Error("Invalid intent object");
                }
                subFrame.addIntent(intent);
            }

            
            frame_controller.goToSubFrame(frame,subFrame);
            subFrame_controller.gotoPage(subFrame,component);
        }           
        break;

        default:
            throw new Error(`Invalid entity type ${component["data"]["entityType"]}`);
    }

}

export const refresher = (component) =>{

    if(!component){
        throw new Error("Component can not be null or undefined");
    }

    if(!component["data"]["entityType"]){
        throw new Error("Component is not a valid object");
    }

    switch (component["data"]["entityType"]) {
        case ENTITYTYPES.FRAME:{
            const frame_controller = new FrameController();
            frame_controller.refresh(component);
        }
        break;

        case ENTITYTYPES.SUBFRAME:{
            const subFrame_controller = new SubFrameController();
            subFrame_controller.refresh(component);
        }  
        break;
        case ENTITYTYPES.PAGE:{
            const page_controller = new PageController();
            page_controller.refresh(component);
        }           
        break;

        default:
            throw new Error(`Invalid entity type ${component["data"]["entityType"]}`);
    }
}

export const createIntent = (name,payload) =>{
    return new Intent(name,payload);
}

export const generatePath = (component) =>{
    let data = {
        "path":{
            "frame":null,
            "subFrame":null,
            "page":null,
        },
    };

    switch (component["data"]["entityType"]) {
        case ENTITYTYPES.FRAME:{
            data["path"]["frame"] = component;
        }
        break;

        case ENTITYTYPES.SUBFRAME:{
            data["path"]["frame"] = component["data"]["frame"];
            data["path"]["subFrame"] = component;
        }  
        break;
        case ENTITYTYPES.PAGE:{
            data["path"]["frame"] = component["data"]["subFrame"]["data"]["frame"];
            data["path"]["subFrame"] = component["data"]["subFrame"];
            data["path"]["page"] = component;
            
        }           
        break;

        default:
            throw new Error(`Invalid entity type ${component["data"]["entityType"]}`);
    }

    return data;
}