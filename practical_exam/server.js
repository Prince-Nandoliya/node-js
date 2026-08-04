import express from "express"
import HttpError from "./middleware/HttpError.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import router from "./routes/Employee.router.js"
import adminrouter from "./routes/admin.router.js"
const app = express()
app.use(express.json())

dotenv.config({path: "./.env"})


app.get("/", (req, res) => {
    res.json("hello from server")
})

app.use("/Employee",router)
app.use("/admin",adminrouter)

app.use((req, res, next) => {
    res.status(404).json({message:"requested route not found"})
})


app.use((error,req,res,next)=>{  
    if(res.headerSent){
        return next(new HttpError(error.message))
    }
    res.status(error.statusCode || 500).
    json({message:error.message || "internal server error"})
})

const port = 5000




async function server() {

    try {

        const connect = await connectDB()

        if (!connect) {
            throw new Error("fail to connect db")

        }

        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message)
            }

            console.log(`server runing on port ${port}`)
        })


    } catch (error) {
        console.log(error.message)
        process.exit(1)

    }

}

server()