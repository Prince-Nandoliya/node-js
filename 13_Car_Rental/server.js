import express from "express"
import HttpError from "./middleware/HttpError.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import router from "./routes/user.routes.js"

const app = express()

app.use(express.json())

dotenv.config({path :"./.env"})

app.get("/", (req, res,) => {
    res.json("hello from server")
})

app.use("/user",router)

app.use((req, res, next) => {
    next(new HttpError("requested routes are not found"))
})

const port = 5000


async function server() {
    try {

        const connect = await connectDB()

        if (!connect) {
            console.log(err.message)
        }

        app.listen(port, (err) => {
            if (err) {
                return console.log(err)
            } else {
                console.log(`server runing on port${port}`)
            }
        })


    } catch (error) {
        next(new HttpError(error.message))

    }

}

server()
