import express from "express"
import HttpError from "./middleware/HttpError.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import router from "./routes/user.routes.js"
import Blogrouter from "./routes/Blog.routes.js"

const app = express()


app.get("/", (req, res) => {
    res.json("hello from server")
})

dotenv.config({path : "./.env"})
app.use(express.json())

app.use("/user",router)
app.use("/blog",Blogrouter)

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
            console.log(err.message)
        }
        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message)
            }

            console.log(`server runing on port${port}`)
        })


    } catch (error) {
        console.log(Error.message)
        process.exit(1)

    }
}
server()