import express from "express"
import connectDB from "./config/db.js"
import HttpError from "./middleware/httpError.js"
import dotenv from "dotenv"
import router from "./routes/packagerouter.js"

dotenv.config({path: "./.env"})

const app = express()

app.use("/package",router)
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello from server")
})

app.use((Error, req, res, next) => {
    if (res.headersSent) {
        return next(Error)
    }

    res.status(Error.statusCode || 500).json({ message: Error.message || "internal server error" })
})

const port = 5000



async function server(req,res,next) {
    try {

        const connect = await connectDB()
        if(!connect){
            return console.log("fail to connect")
        }

        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message)
            }
            console.log(`server runing on port ${port}`)
        })

    } catch (Error) {
      next(new HttpError(Error.message))

    }
}

server()