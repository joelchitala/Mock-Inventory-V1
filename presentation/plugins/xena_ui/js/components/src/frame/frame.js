import { BaseComponent, ENTITYTYPES } from "../../shared/base_component.js";

export class Frame extends BaseComponent {
    constructor() {
        super(ENTITYTYPES.FRAME);
        
        this.data = {
            ...this.data,
            ...{
                "subFrames":[],
                "currentSubFrame":null,
                "historyStack" : [],
                "forwardStack" : [],
            }
        }
    }
}