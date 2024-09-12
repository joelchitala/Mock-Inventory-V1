const express = require("express"); 
const cors = require("cors");


const setupMiddleware = (app) =>{

}

const startServer = (port) =>{
    return new Promise(resolve=>{
        const app = express();
        app.use(cors());
        
        setupMiddleware(app);

        app.get('/',(req,res)=>{
            res.send("welcome to mock inventory");
        });

        app.get('/data',(req,res)=>{
            res.json({"name":"joel"});
        });

        app.listen(port,()=>{
            resolve();
            console.log(`Server running on http://127.0.0.1:${port}`);
        });    
    });
}

const main = (port) =>{
    return startServer(port);
}

main(3000);