import { BaseComponent, ENTITYTYPES } from "../../shared/base_component.js";

export class Page extends BaseComponent{
    constructor(name, refresh = false) {
        super(ENTITYTYPES.PAGE);

        this.data = {
            ...this.data,
            ...{
                "name":name,
                "subFrame":null,
                "refresh":refresh,
                "intent":null,
            }
        }
    }

    getIntent(name){
        const subFrame = this.data.subFrame;

        if(!subFrame){
            return null;
        }

        const intent = subFrame.getIntent(name);

        if(!intent){
            return null;
        }
        
        return intent["data"];
    }
}