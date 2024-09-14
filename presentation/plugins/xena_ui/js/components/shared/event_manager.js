import { generateUUID } from "../../shared/utilities.js";

export class EventManager {
    constructor() {
        this.data = {
            "id":generateUUID(),
            "proxies":[],
        }
    }

    process(event){
        if(!event){
            throw new Error("Event Object can not be null or undefined");
        }


        const proxies = this.data.proxies;

        for (let i = 0; i < proxies.length; i++) {
            const proxy = proxies[i];
            
            if(event.data["command"] != proxy["command"]){
                continue;
            }
            
            proxy["func"](event);
        }

    }

    registerProxy(name,command,func){
        const proxies = this.data.proxies;
        
        name = name.trim().toLowerCase();

        if(name == ""){
            throw new Error("Proxy name can not be empty");
        }

        const exists = proxies.find(x =>{
            return `${x["func"]}` == `${func}` || x["name"] == name;
        });

        if(exists){
            throw new Error(`Proxy with the name ${name} and/or function ${func} already exists`);
        }

        proxies.push({"name":name,"command":command,"func":func});

        return proxies;
    }

    deRegisterProxy(name){
        const proxies = this.data.proxies;
        
        name = name.trim().toLowerCase();

        if(name == ""){
            throw new Error("Proxy name can not be empty");
        }

        for (let i = 0; i < proxies.length; i++) {
            const proxy = proxies[i];
            
            if(proxy["name"] == name){
                proxies.splice(i,1);
                return proxies;
            }
        }

        throw new Error(`Proxy with the name ${name} does not exists`);
    }
}

export class EventObject{
    constructor(command,payload){
        this.data = {
            "command":command,
            "payload":payload,
        }
    }
}