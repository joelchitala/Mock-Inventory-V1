import { pathNavigator } from "../../plugins/xena_ui/js/components/shared/shared_utilities.js";
import { FrameController } from "../../plugins/xena_ui/js/controllers/frame_controller.js";
import { FrameLogic } from "../../plugins/xena_ui/js/logic/frame_logic.js";
import { SubFrameLogic } from "../../plugins/xena_ui/js/logic/sub_frame_logic.js";

export const frameController = new FrameController();

export const inventoryFrame = frameController.createFrame((self,body,subFrame)=>{
    body.innerHTML = `<h1>Inventroy</h1>`;


    const arrow_back = document.createElement('button');
    arrow_back.innerText = "<";
    arrow_back.onclick = (e) =>{
        frameController.popSubFrame(self);
    }

    const arrow_forward = document.createElement('button');
    arrow_forward.innerText = ">";
    arrow_forward.onclick = (e) =>{
        frameController.pushSubFrame(self);
    }

    const arrow_container = document.createElement("div");

    arrow_container.style = `
        display:flex;
        flex-direction:row;
        align-items:center;
    `
    arrow_container.appendChild(arrow_back);
    arrow_container.appendChild(arrow_forward);


    const pages = SubFrameLogic.getPages(FrameLogic.getCurrentSubFrame(self));

    const pagesContainer = document.createElement('div');
    pagesContainer.style = `
        display: inline-flex;
        align-items: center;
        
    `;

    pages.forEach(x =>{
        const tab = document.createElement("div");

        tab.innerHTML = `<p>${x["data"]["name"]}<p>`;

        tab.style = `
            width: 32;
            height: 20;
            padding: 0.75rem;
            background-color: #f6f6f6;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor:pointer;
        `;

        tab.onmouseover = (e) =>{
            tab.style.backgroundColor = "#eaeaea"
        }

        tab.onmouseout = (e) =>{
            tab.style.backgroundColor = `#f6f6f6`
        }
        
        pagesContainer.appendChild(tab);

        tab.onclick = (e) =>{
            pathNavigator(x);
        }
    });

    const topContainer = document.createElement("div");
    topContainer.style = `
        display: inline-flex;
        align-items: center;
    `

    topContainer.appendChild(arrow_container);
    topContainer.appendChild(pagesContainer);

    body.appendChild(topContainer)
    
    if(subFrame){
        body.appendChild(subFrame.getBody());
    }

    body.style = "height: 100%; overflow: hidden;"
});