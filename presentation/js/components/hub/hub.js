import { generateUUID } from "../../shared/utilities.js";

export class Hub {
    constructor(parent = null) {
        this.data = {
            "id":generateUUID(),
            "parent":parent,
        }

        this.frames = [];
        this.currentFrame = null;
    }

    registerFrame(frame){
        const f = this.frames.find(x => x.data["id"] == frame.data["id"]);

        if(f){
            return false;
        }

        if(this.frames.length == 0){
            this.currentFrame = frame;
        }
        
        this.frames.push(frame);

        return true;
    }

    deRegisterFrame(frame){
        const index = this.frames.indexOf(frame);

        if(index == -1){
            return;
        }

        this.frames.splice(index,1);

        if(this.frames.length == 0){
            this.currentFrame = null;

            return;
        }

        if(index > this.frames.length -1){
            this.currentFrame = this.frames[index-1];
            return;
        }

        if(index < this.frames.length -1){
            this.currentFrame = this.frames[index];
            return;
        }
    }

    goToFrame(frame){
        const res = this.frames.includes(frame);

        if(!res){
            return false;
        }

        this.currentFrame = frame;

        this.render();
    }

    render(){
        const parent = this.data.parent;

        if(!parent){
            return;
        }

        
        
        if(this.currentFrame == null){
            return;
        }
        
        parent.innerHTML = "";
        
        this.currentFrame.render();
        
        parent.appendChild(this.currentFrame.data["body"])
    }
}