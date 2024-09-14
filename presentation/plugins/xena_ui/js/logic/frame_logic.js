export class FrameLogic {

    static getSubFrames(frame){
        return [...frame.data["subFrames"]];
    }

    static getCurrentSubFrame(frame){
        return frame.data["currentSubFrame"];
    }

    static setCurrentSubFrame(frame,subFrame){

        if(!subFrame){
            frame.data["currentSubFrame"] = null;

            return null;
        }

        if(frame.data["currentSubFrame"] == subFrame){
            // throw new Error(`Failed to set current subFrame. Current subFrame is already set to ${subFrame.data["id"]}`);
            return;
        }

        frame.data["currentSubFrame"] = subFrame;

        return frame.data["currentSubFrame"];
    }

    static getHistoryStack(frame){
        return [...frame.data["historyStack"]]
    }

    static getForwardStack(frame){
        return [...frame.data["forwardStack"]]
    }

    static appendToHistoryStack(frame,subFrame){
        const historyStack = frame.data["historyStack"];
        const len = historyStack.length;

        if(len == 0){
            historyStack.push(subFrame);
            return historyStack;
        }
        

        if(historyStack[len - 1].getId() == subFrame.getId()){
            return historyStack;
        }

        historyStack.push(subFrame);
        
        return historyStack;
    }

    static removeFromHistoryStack(frame, subFrame){
        const historyStack = frame.data["historyStack"];

        for (let i = 0; i < historyStack.length; i++) {
            const historySubFrame = historyStack[i];
            
            if(subFrame.getId() == historySubFrame.getId()){
                historyStack.splice(i,1);
                return historyStack;
            }
        }

        return historyStack;
    }

    static resetHistoryStack(frame){
        frame.data["historyStack"] = [];

        return frame.data["historyStack"];
    }

    static appendToForwardStack(frame,subFrame){
        const forwardStack = frame.data["forwardStack"];
        const len = forwardStack.length;

        if(len == 0){
            forwardStack.push(subFrame);
            return forwardStack;
        }

        if(forwardStack[len - 1].getId() == subFrame.getId()){
            return forwardStack;
        }

        forwardStack.push(subFrame);
        
        return forwardStack;
    }

    static removeFromForwardStack(frame, subFrame){
        const forwardStack = frame.data["forwardStack"];

        for (let i = 0; i < forwardStack.length; i++) {
            const historySubFrame = forwardStack[i];
            
            if(subFrame.getId() == historySubFrame.getId()){
                forwardStack.splice(i,1);
                return forwardStack;
            }
        }

        return forwardStack;
    }

    static resetForwardStack(frame){
        frame.data["forwardStack"] = [];

        return frame.data["forwardStack"];
    }

    static registerSubFrame(frame,subFrame){
        const subFrames = frame.data["subFrames"];
        const exists = subFrames.includes(subFrame);
        
        if(exists){
            throw new Error(`Frame ${subFrame.data["id"]} is already registered`);
        }

        subFrames.push(subFrame);

        return subFrames;
    }

    static deRegisterSubFrame(frame,subFrame){
        const subFrames = frame.data["subFrames"];
        const index = subFrames.indexOf(subFrame);
        
        if(index < 0){
            throw new Error(`Frame ${subFrame.data["id"]} is not registered`);
        }

        subFrames.splice(index,1);

        return subFrames;
    }
    
    static setTemplate(frame,template = (self,body,subFrame)=>{}){
        frame.data["template"] = template;
    }

    static refresh(frame){
        const body = frame.data["body"];
        body.innerHTML = "";

        this.resetHistoryStack(frame);
        this.resetForwardStack(frame);

        const subFrames = this.getSubFrames(frame);

        if(subFrames.indexOf(this.getCurrentSubFrame(frame)) > 0){
            this.setCurrentSubFrame(frame,this.getSubFrames(frame)[0]);
        }

        return this.render(frame);
    }

    static render(frame){
        const body = frame.data["body"];
        const template = frame.data["template"];
        const subFrame = frame.data["currentSubFrame"];

        if(!template){
            throw new Error("No template found. Can not render");
        }
        
        body.innerHTML = "";
        
        template(frame,body,subFrame);

        frame.data["rendered"] = true;

        return body;
    }
}