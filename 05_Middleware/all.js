import express from "express"

const all = express()

//application  middleware
all.use(express.json())

//Route middleware

all.get("/",(req,res)=>{
    res.send("this is a home page")
})

all.get("/about",(req,res)=>{
    res.send("this is a about page")
})

//undefin middleware
all.use((req,res)=>{
    res.send("this req is not found")
})

const port = 5000;

all.listen(port,(err)=>{
    if(err){
        return console.log(err)
    }
    console.log(`server runing on port${port}`)
})