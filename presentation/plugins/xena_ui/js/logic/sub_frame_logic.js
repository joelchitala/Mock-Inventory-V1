export class SubFrameLogic {
    static getPages(subFrame){
        return [...subFrame.data["pages"]];
    }

    static getCurrentPage(subFrame){
        return subFrame.data["currentPage"];
    }

    static setCurrentPage(subFrame, page){

        if(!page){
            frame.data["currentPage"] = null;

            return null;
        }

        if(subFrame.data["currentPage"] == page){
            // throw new Error(`Failed to set current page. Current page is already set to ${page.data["id"]}`);
            return;
        }

        subFrame.data["currentPage"] = page;
    }

    static registerPage(subFrame,page){
        const pages = subFrame.data["pages"];
        const exists = pages.includes(page);
        
        if(exists){
            throw new Error(`Frame ${page.data["id"]} is already registered`);
        }

        pages.push(page);

        return pages;
    }

    static deRegisterPage(subFrame, page){
        const pages = subFrame.data["pages"];
        const index = pages.indexOf(page);
        
        if(index < 0){
            throw new Error(`Frame ${page.data["id"]} is not registered`);
        }

        pages.splice(index,1);

        return pages;
    }

    static setTemplate(subFrame,template = (self,body,page)=>{}){
        subFrame.data["template"] = template;
    }

    static refresh(subFrame){
        const body = subFrame.data["body"];
        body.innerHTML = "";

        const pages = this.getPages(subFrame);

        if(pages.indexOf(this.getCurrentPage(subFrame)) > 0){
            this.setCurrentPage(subFrame,pages[0]);
        }
        
        return this.render(subFrame);
    }

    static render(subFrame){

        const body = subFrame.data["body"];
        const template = subFrame.data["template"];
        const page = subFrame.data["currentPage"];

        if(!template){
            throw new Error("No template found. Can not render");
        }

        body.innerHTML = "";

        template(subFrame,body,page);

        subFrame.data["rendered"] = true;

        return body;
    }
}