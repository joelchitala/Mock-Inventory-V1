import { EventObject } from "../components/shared/event_manager.js";
import { Hub } from "../components/src/hub/hub.js";

export class BaseController {
    constructor() {
        this.hub = new Hub();
    }

     emit(command,payload){
        const eventObject = new EventObject(command,payload);
        this.hub.data.event_manager.process(eventObject);
    }
}