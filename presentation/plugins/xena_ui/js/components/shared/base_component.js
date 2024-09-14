import { generateUUID } from "../../shared/utilities.js";
import { Hub } from "../src/hub/hub.js";

export const ENTITYTYPES ={
    FRAME:"FRAME",
    SUBFRAME:"SUBFRAME",
    PAGE:"PAGE",
    INTENT:"INTENT",
}

export class BaseComponent {
    constructor(entityType) {
        this.data = {
            "id":generateUUID(),
            "body":document.createElement('div'),
            "template":null,
            "rendered":false,
            "entityType":entityType,
        }
    }

    getId(){
        return this.data.id;
    }

    getBody(){
        return this.data.body;
    }

    setRenderTrue(){
        this.data.rendered = true;
    }

    setRenderFalse(){
        this.data.rendered = false;
    }
}