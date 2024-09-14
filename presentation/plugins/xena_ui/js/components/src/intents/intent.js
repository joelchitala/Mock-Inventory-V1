import { ENTITYTYPES } from "../../shared/base_component.js";

export class Intent {
    constructor(name,payload) {

        this.data = {
            "name":name.toLowerCase(),
            "payload":payload,
            "entityType":ENTITYTYPES.INTENT
        }

    }

    getName(){
        return this.data["name"];
    }

    getPayload(){
        return this.data["payload"];
    }

    getData(){
        return this.data;
    }
}