import express from "express"
import HttpError from "./middleware/HttpError.js";

const app = express();

 const tasklist = [
{id: 1,task : "learn",message: "this is for learnig"},
 {id: 2, task : "craet", message : "this is for advice"}
]


app.get("/",(req,res)=>{
    res.send("hello from server")
})

app.get("/tasklist",(req,res)=>{
    res.status(200).json({
        success: true,
        message: "task list",
        tasklist
    })
})






const port = 5000;

app.listen(port,(err)=>{
    if(err){
        return console.log(err)
    }
    console.log(`server is runing on port${port}`)
})

                                               