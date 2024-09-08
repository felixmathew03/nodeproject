const PORT=3000;
const http=require("http")
const fs=require("fs")
const url=require("url")
const queryString=require("querystring")
const {MongoClient,ObjectId}=require("mongodb")
//connect database
const client=new MongoClient("mongodb://127.0.0.1:27017/")

const app=http.createServer(async(req,res)=>{
    //create database
    const db=client.db("Student")
    //create collection
    const collection=db.collection("details")
    const path=url.parse(req.url)
    console.log(path);

    if(path.pathname=="/"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../clientside/index.html"))
    }
    else if(path.pathname=="/js/index.js"){
        res.writeHead(200,{"Content-Type":"text/js"});
        res.end(fs.readFileSync("../clientside/js/index.js"))
    }
    else if(path.pathname=="/pages/add"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../clientside/pages/add.html"))
    }


    //fetch data from add student
    if(path.pathname=="/submit" && req.method=="POST"){
        let body="";
        req.on("data",(chunks)=>{
            body+=chunks.toString();
            console.log(body);
        });
        req.on("end",async()=>{
            //convert query string to obj
            const formData=queryString.parse(body);
            //insert to colllection
            collection.insertOne(formData).then(()=>{
                console.log("success");
            }).catch((error)=>{
                console.log(error);
            });
        });
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../clientside/index.html"))
    }

    if(path.pathname=="/getstudents" && req.method=="GET"){
        const data = await collection.find().toArray();
        const jsonData=JSON.stringify(data);
        console.log(jsonData);
        res.writeHead(200,{"Content-Type":"text/json"});
        res.end(jsonData)
    }
    if(path.pathname=="/delete"&&req.method=="DELETE"){
        console.log("reached delete route");
        let body=""
        req.on("data",(chunks)=>{
            body+=chunks.toString();
            console.log(body);
        })
        req.on("end",async()=>{
            let _id=new ObjectId(body);
            collection.deleteOne({_id}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("success")
            }).catch(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("fail");
            })
        })
    }
    if(path.pathname=="/update" && req.method=="PUT"){
        console.log("reached update route");
        let body=""
        req.on("data",(chunks)=>{
            body=chunks.toString();
            console.log(body);
        })
        req.on("end",async()=>{
            let data=JSON.parse(body);
            let _id=new ObjectId(data.id);
            let updateData={
                name:data.name,
                class:data.clss,
                rollno:data.rno,
                physics:data.physics,
                maths:data.maths,
                physics:data.physics
            }
            await collection.updateOne({_id},{$set:updateData}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("success")
            }).catch(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("fail")
            })
        });
    }
});

client.connect().then(()=>{
    console.log("database connected");
    app.listen(PORT,()=>{
        console.log(`server at http://localhost:${PORT}/`);
    });
}).catch((error)=>{
    console.log(error);
})