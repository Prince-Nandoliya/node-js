import express from "express"
import HttpError from "./middleware/HttpError.js"
import router from "./routes/packagerouter.js"
import dotenv from "dotenv"
import connectdb from "./config/db.js"

dotenv.config({path: "./.env"})


const app = express()

app.use(express.json())

app.use("/package",router)
app.get("/",(req,res,next)=>{
    res.send("hello from server")
})

app.use((req,res,next)=>{
    res.status(404).json("requested route are not found")
})

app.use((Error,req,res,next)=>{

    if(res.headersSent){
        return console.log("Data base connection failed")
    }

    res.status(Error.statusCode || 500).json({message:Error.message || "something went worng"})
})

const port = process.env.PORT || 5000

async function server(req,res,next) {

    try {
        
        const connect = await connectdb()

        if(!connect){
            throw new HttpError("database connection failed",500)
        }

        app.listen(port,(err)=>{
            if(err){
                return console.log(err.message)
            }

            console.log(`server runing on port${port}`)
        })

    } catch (error) {
        console.log(error.message)
        process.exit(1)
        
    }
    
}

server()