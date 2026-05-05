import express, { application } from "express";
import HttpError from "./middleware/httperror.js";
import checkRoll from "./middleware/checkroll.js";
import helmet from "helmet"

const all = express()

//external middleware
all.use(helmet());

//application  middleware
all.use(express.json())
all.get("/",(req,res)=>{
    res.send("this is a home page")
})

//Route middleware



all.get("/about",(req,res)=>{
    res.send("this is a about page")
})

//undefin middleware
all.use((req,res)=>{
    res.send("this req is not found")
})

// centralized error

all.use((err,res,req,error)=>{
    console.log(error.message);

    res
    .status(error.status || 500)
    .json({message : error.message || "internal server error"})
})


const port = 5000;

all.listen(port,(err)=>{
    if(err){
        return console.log(err)
    }
    console.log(`server runing on port${port}`)
})

