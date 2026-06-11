import express from "express"
import HttpError from "./middleware/HttpError.js"
import mongoose from "mongoose"
import connectDB from "./config/db.js"
import dotenv, { config } from "dotenv"
import router from "./routes/userRouter.js"
dotenv.config({ path: "./.env" })

const app = express()

app.use(express.json())

app.get("/", (req, res, next) => {
    res.send("hello from server")
})

app.use("/user", router)

app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).json({
        success:false,
        message:err.message
    })
})
const port = 5000

async function server() {
    try {

        const connect = await connectDB()

        if (!connect) {
            throw new error("fail to connect DB")
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