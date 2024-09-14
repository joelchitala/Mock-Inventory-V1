export class PageLogic {
    static setTemplate(page,template = (self,body)=>{}){
        page.data["template"] = template;
    }

    static refresh(page){
        const body = page.data["body"];
        body.innerHTML = "";

        return this.render(page,this.getIntent(page));
    }

    static render(page){

        const body = page.data["body"];
        const template = page.data["template"];

        if(!template){
            throw new Error("No template found. Can not render");
        }

        body.innerHTML = "";
        
        template(page,body);

        page.data["rendered"] = true;

        return body;
    }
}