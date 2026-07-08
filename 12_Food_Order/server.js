import express from "express"
import HttpError from "./middleware/HttpError.js"
import router from "./routes/user.routes.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"

dotenv.config({path: "./.env"})


const app = express()

app.use(express.json())


app.get("/", (req, res) => {
    res.json("hello from server")
})

app.use("/user",router)

app.use((req, res, next) => {
    next(new HttpError("requested routes are not found"))
})


app.use((Error, req, res, next) => {
    if (res.headersSent) {
        return next(Error)
    }

    res.status(Error.StatusCode || 500).
        json({ message: Error.message || "internal server error" })
})

const port = 5000




async function server() {
    try {

        const connect = await connectDB()

        if (!connect) {
            return console.log(err.message)
        }


        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message)
            }

            console.log(`server runing on port ${port}`)
        })

    } catch (error) {
        throw new error(error.message)
        process.exit(1)

    }

}

server()

