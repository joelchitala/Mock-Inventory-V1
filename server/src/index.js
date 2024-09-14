const express = require("express"); 
const cors = require("cors");
const bodyParser = require('body-parser');
const mongodb = require("mongodb");

const DBHOST = "mongodb://localhost:27017";
const DBNAME = "mock-inventory";

const setupMiddleware = (app,db) =>{
    app.use(cors());
    app.use(bodyParser.json());

    app.use((req,res,next)=>{
        let dt = new Date();
        let formatted_date = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
        let formatted_log = `[${formatted_date}] ${req.method}:${req.url} ${res.statusCode}`;
        console.log(formatted_log);
        next()
    });

    app.param('collectionName',(req,res,next,collectionName)=>{
        if (db != undefined) {
            req.collection = db.collection(collectionName);
        }
        return next()
    })
}

const startServer = (port,db) =>{
    return new Promise(resolve=>{
        const app = express();
        setupMiddleware(app,db);

        app.get('/',(req,res)=>{
            res.send("welcome to mock inventory");
        });

        app.get('/collection/:collectionName',(req,res)=>{

            const objects = req.collection.find(req.body).toArray();

            objects.then(data=>{
                res.send(data);
            }).catch(err => {
                res.sendStatus(500);
            });
        });

        app.post('/get/:collectionName',(req,res)=>{

            const objects = req.collection.find(req.body).toArray();

            objects.then(data=>{
                res.send(data);
            }).catch(err => {
                res.sendStatus(500);
            });
        });

        app.post('/collection/:collectionName',(req,res)=>{

            req.collection.insertMany(req.body).then(data => {
                res.send({"ids":data["insertedIds"]});
            }).catch(err=>{
                res.sendStatus(500);
            });
        });

        app.patch('/collection/:collectionName',(req,res)=>{
            req.collection.bulkWrite(req.body).then(data=>{
              res.send(data);  
            }).catch(err=>{
                res.sendStatus(500)
            });
        });

        app.patch('/update/:collectionName/:id',(req,res)=>{
            req.collection.updateOne({"_id":new mongodb.ObjectId(req.params.id)},{"$set":req.body}).then(data=>{
              res.send(data);  
            }).catch(err=>{
                res.sendStatus(500)
            });
        });

        app.delete('/collection/:collectionName',(req,res)=>{

            req.collection.deleteMany(req.body).then(data => {
                res.send(data);
            }).catch(err=>{
                res.sendStatus(500);
            });
        });

        app.delete('/delete/:collectionName/:id',(req,res)=>{

            console.log(req.params.id);
            
            req.collection.deleteOne({_id: new mongodb.ObjectId(req.params.id)}).then(data => {
                res.send(data);
            }).catch(err=>{
                res.sendStatus(500);
            });
        });

        app.listen(port,()=>{
            resolve();
            console.log(`Server running on http://127.0.0.1:${port}`);
        });    
    });
}

const main = (port) =>{
    return mongodb.MongoClient.connect(DBHOST)
    .then(client => {
        const db = client.db(DBNAME);
        startServer(port,db);
    }).catch(error => {
        console.error(error);
    });
}

main(3000);