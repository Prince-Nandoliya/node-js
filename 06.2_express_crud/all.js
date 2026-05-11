import express from "express"
import HttpError from "./middleware/HttpError.js"

const all = express()
all.use(express.json())

const carlist = [
    {
        id: 1,name: "bmw m5",price: "2.5 cr"

    },
    {
        id: 2,name: "Audi A4",price: "45 lakh"

    }
]

all.get("/",(req,res)=>{
    res.send("hello form server")
})

all.get("/carlist",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"car list",
        carlist
    })
})

all.get("/car/:id",(req,res)=>{
    const id = Number(res.params.id)

    const car = carlist.find((c)=>c.id===id)
    if(!car){
        return res
        .status(404)
        .json({success:true,message:"no car found with this id"})
    }
    res.status(200).json({success:true,message:"car found",car})
})

all.post("/addcar",(req,res,next)=>{
    const{name,price} = req.body

    if(!name || !price){
        return next(new HttpError("name and price are required",400))

    }
    const newCar = {
        id:new Date().getTime(),
        name,
        price,
    }
    carlist.push(newCar)

    res.status(201).json({success:true,message:"new car added successfully",newCar})
})

all.delete("/carlist/:id",(req,res,next)=>{
    const id = Number(req.params.id)


    const index = carlist.findIndex((c)=>c.id === id)

    if(index === -1){
        return next(new HttpError("requested route are not found"))
    }

    carlist.splice(index,1)

    res.status(200).json({success:true,message:"car deleted successfully"})

})


all.use((req,res,next)=>{
    return next(new HttpError("requested route not found",404))
})

all.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error)
    }
    res.status(error.statusCode || 500).json({
        message:error.message || "something want wrong please try again"
    })
})
const port = 5000;

all.listen(port,(err)=>{
    if(err){
        return console.log(err)
    }
    console.log(`server runing from port${port}`)
})