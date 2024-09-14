import { DEREGISTERED_PAGE, REGISTERED_PAGE, RENDER_PAGE } from "../components/shared/commands.js";
import { Page } from "../components/src/page/page.js";
import { PageLogic } from "../logic/page_logic.js";
import { SubFrameLogic } from "../logic/sub_frame_logic.js";
import { BaseController } from "./base_controller.js";

export class PageController extends BaseController{
    
    createPage(subFrame,name,template = (self,body) =>{}){
        let page;

        try {
           page = new Page(name); 
           PageLogic.setTemplate(page,template);

           const frame = subFrame.data["frame"];

           SubFrameLogic.registerPage(subFrame,page);

           page.data["subFrame"] = subFrame;

            if(subFrame.data["currentPage"] == null){
                SubFrameLogic.setCurrentPage(subFrame,page);
            }

            this.emit(REGISTERED_PAGE,{"hub":this.hub,"frame":frame,"subFrame":subFrame,"page":page});
        } catch (error) {
            console.error(error);
            
        }

        return page;
    }

    deletePage(page){
        const subFrame = page.data["subFrame"];
        try {
            const frame = subFrame.data["frame"];

            const pages = SubFrameLogic.deRegisterPage(subFrame,page);

            page.data["subFrame"] = null;

            this.emit(DEREGISTERED_PAGE,{"hub":this.hub,"frame":frame, "subFrame":subFrame,"page":page});
            return pages;
        } catch (error) {
            console.error(error);
        }

        return SubFrameLogic.getPages(subFrame);
    }

    refresh(page){
        if(!page){
            return;
        }

        try {
            PageLogic.refresh(page);
        } catch (error) {
            console.error(error);
        }
    }

    render(page){
        if(!page){
            return;
        }
        try {
            const subFrame = page.data["subFrame"];
            const frame = subFrame.data["frame"];
            PageLogic.render(page);
            this.emit(RENDER_PAGE,{"hub":this.hub,"frame":frame,"subFrame":subFrame,"page":page});
        } catch (error) {
            console.error(error);
        }
    }
}