import express from "express";
import HttpError from "./middleware/HttpError.js"
import connected from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js"
import cors from "cors"
import dotenv from "dotenv"


const all = express()
dotenv.config("./.env")

all.use(cors())

all.use(express.json())
all.use("/student",studentRoutes)


all.get("/",(req,res)=>{
    res.send("hello form server")
})


const port = 5000



async function startserver(){
    try {
        const connect = await connected();
        
        if(!connect){
            throw new Error("failed to connect db")
        }

        all.listen(port,(error)=>{
            if(error){
                return console.log(error.message)
            }

            console.log(`server runnig on port${port}`)
        })

    } catch (error) {
        console.log(error.message)
        process.exit(1)
        
    }

}
startserver();





