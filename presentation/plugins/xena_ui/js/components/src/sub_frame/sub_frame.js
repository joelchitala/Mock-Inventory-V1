import { BaseComponent, ENTITYTYPES } from "../../shared/base_component.js";

export class SubFrame extends BaseComponent{
    constructor() {
        super(ENTITYTYPES.SUBFRAME);

        this.data = {
            ...this.data,
            ...{
                "frame":null,
                "pages":[],
                "currentPage":null,
                "intents":{}
            }
        }
    }

    getIntent(name){
        return this.data.intents[name];
    }

    addIntent(intent){
        if(!intent){
            throw new Error("Intent can not be null or undefined");
        }
        this.data.intents[intent.getName()] = intent;
    }

    removeIntent(name){
        const intent = this.data.intents[name];

        if(intent){
            delete this.data.intents[name];
        }

        return intent;
    }

    clearIntents(){
        this.data.intents = {};

        return this.data.intents;
    }
}