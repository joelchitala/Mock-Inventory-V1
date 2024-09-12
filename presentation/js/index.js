import { Frame, pageNavigator } from "./components/frame/frame.js";
import { SubFrame } from "./components/sub_frame/sub_frame.js";
import { Page } from "./components/page/page.js";
import { compareDict, generateUUID } from "./shared/utilities.js";
import { Hub } from "./components/hub/hub.js";

const baseUrl = "http://127.0.0.1:3000";

// fetch(`${baseUrl}/data`,{
//     method:"GET"
// }).then(res => {
//     res.json().then(data =>{
//         console.log(data);
        
//     })
// });

const main = document.querySelector("main");

const frame = new Frame(main);

const sub_frame_1 = new SubFrame();

frame.registerSubFrame(sub_frame_1);

const page1 = new Page("page-1");
const page2 = new Page("page-2");

sub_frame_1.registerPage(page1);
sub_frame_1.registerPage(page2)

page1.setTemplate((self,body)=>{
    body.innerHTML = `
    <h2>Hello World from page 1</h2>
    <input type="number"></input>
    `;
})

page2.setTemplate((self,body)=>{
    body.innerHTML = `
    <h2>Hello World from page 2</h2>
    <input type="number"></input>
    `;
});

sub_frame_1.setTemplate((self,body,page)=>{

    let tabs = document.createElement('div');

    for (let i = 0; i < self.pages.length; i++) {
        const page = self.pages[i];

        const tab = document.createElement('button');

        tab.innerText = page.data["name"];

        tab.onclick = (e) =>{
            self.goToPageExplicit(page);
        }

        tabs.appendChild(tab);
    }

    body.appendChild(tabs);
    body.appendChild(page.getBody());
});

const sub_frame_2 = new SubFrame();

frame.registerSubFrame(sub_frame_2);

const page3 = new Page("page-3");
const page4 = new Page("page-4");

sub_frame_2.registerPage(page3);
sub_frame_2.registerPage(page4)

page3.setTemplate((self,body,data)=>{
    body.innerHTML = `
    <h2>Hello World from page 3</h2>
    <input type="number"></input>
    `;
})

page4.setTemplate((self,body,data)=>{
    body.innerHTML = `
    <h2>Hello World from page 4</h2>
    <input type="number"></input>
    `;

    const f = `
    <table id="item-table" style="width: 100%; border-collapse: collapse; table-layout: fixed;">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Qty</td>
                    <td>Total</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Milk</td>
                    <td>$9</td>
                    <td>15</td>
                    <td>$135</td>
                    <td><button>Edit</button></td>
                    <td><button>Delete</button></td>
                </tr>
                <tr>
                    <td>Eggs</td>
                    <td>$1</td>
                    <td>12</td>
                    <td>$12</td>
                    <td><button>Edit</button></td>
                    <td><button>Delete</button></td>
                </tr>
                <tr>
                    <td>Meat</td>
                    <td>$18</td>
                    <td>12</td>
                    <td>$216</td>
                    <td><button>Edit</button></td>
                    <td><button>Delete</button></td>
                </tr>
            </tbody>
        </table>
    `;

    body.innerHTML += f;
    
});

sub_frame_2.setTemplate((self,body,page)=>{

    let tabs = document.createElement('div');

    for (let i = 0; i < self.pages.length; i++) {
        const page = self.pages[i];

        const tab = document.createElement('button');

        tab.innerText = page.data["name"];

        tab.onclick = (e) =>{
            self.goToPageExplicit(page);
        }

        tabs.appendChild(tab);
    }

    body.appendChild(tabs);
    body.appendChild(page.getBody());
});


frame.setTemplate((self,body,subFrame)=>{

    let subframes = document.createElement('div');

    const backward = document.createElement('button');
    backward.innerHTML = "<";
    backward.onclick = (e) =>{
        self.popFrame();
    }

    subframes.appendChild(backward);

    const forward = document.createElement('button');
    forward.innerHTML = ">";
    forward.onclick = (e) =>{
        self.pushFrame();
    }

    subframes.appendChild(forward);
    
    

    // for (let i = 0; i < self.subFrames.length; i++) {
    //     const subFrame = self.subFrames[i];

    //     const tab = document.createElement('button');

    //     tab.innerText = subFrame.data["id"];

    //     tab.onclick = (e) =>{
    //         self.goToSubFrame(subFrame);
    //     }

    //     subframes.appendChild(tab);
    // }

    

    body.appendChild(subframes);

    body.appendChild(subFrame.data["body"]);
});

// frame.render();

// pageNavigator(page1,page4, {"msg":"Hola Mi Amigos"});

const hub = new Hub(main);

hub.registerFrame(frame);

hub.render();



