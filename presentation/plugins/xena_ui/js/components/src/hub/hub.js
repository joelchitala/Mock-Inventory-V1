import { generateUUID } from "../../../shared/utilities.js";
import { BaseComponent } from "../../shared/base_component.js";
import { EventManager } from "../../shared/event_manager.js";

export class Hub{
    constructor() {
        this.data = {
            "id":generateUUID(),
            "event_manager": new EventManager(),
            "frames":[],
            "currentFrame":null,
            "parentElement":null,
            "rendered":false,
        }
        
        if(!Hub.instance){
            Hub.instance = this;
        };

        return Hub.instance;
    }

    setRenderTrue(){
        this.data.rendered = true;
    }

    setRenderFalse(){
        this.data.rendered = false;
    }
    
    setParentElement(parentElement){
        this.data.parentElement = parentElement;
    }

    registerEventProxy(name = "" , commandType ,func = (command,payload)=>{}){
        this.data.event_manager.registerProxy(name,commandType,func);
    }

    deRegisterEventProxy(name = ""){
        this.data.event_manager.deRegisterProxy(name);
    }

    
}