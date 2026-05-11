import express from "express"
import HttpError from "../06_express_crud/middleware/HttpError.js"

const bike = express()
bike.use(express.json())

const bikelist = [
    {id:1,name:"gt 650",price:"4 lakh"},
    {id:2,name:"bmw s1000rr",price:"22 lakh"}
]

bike.get("/",(req,res)=>{
    res.send("hello from bike srver")
})

bike.get("/bikelist",(req,res)=>{
    res.status(200).json({
        success: true,
        message: "bike list",
        bikelist
    })
})

bike.get("/bike/:id",(req,res)=>{
    const id = Number(req.params.id)


    const bike = bikelist.find((b)=>b.id === id)
    if(!bike){
        return res
        .status(404)
        .json({success:true,message:"No Bike Found With This Id"})
    }
    res.status(200).json({success:true,message:"bike found",bike})
})

bike.post("/addbike",(req,res,next)=>{
    const{name,price} = req.body

    if(!bike || !price){
        return next(new HttpError("name and price are requires",400))
    }
    const newBike = {
        id:new Date().getTime(),
        bike,
        price,
    }
    bikelist.push(newBike)

    res.status(201).json({success:true,message:"new bike added successfully",newBike})
})

const port = 5000;

bike.listen(port,(err)=>{
    if(err){
        return console.log(err)
    }
    console.log(`server runing on port${port}`)
})