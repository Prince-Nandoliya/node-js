import express from "express"
import HttpError from "./middleware/HttpError.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import router from "./routes/userRouter.js"

dotenv.config({path: "./.env"})

const app = express()



app.use(express.json())
app.use("/user",router)
app.get("/", (req, res) => {
    res.send("hello from server")
})
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(new httpError(error.message));
    }

    res
        .status(error.statusCode || 500)
        .json({ message: error.message || "internal error" });
});


const port = 5000





async function server() {
    try {

        const connect = await connectDB()

        if (!connect) {
            console.log("fail to connect")
        }
        app.listen(port, (err) => {
            if (err) {
                console.log(err.message)
            }

            console.log(`server runing on port${port}`)
        })


    } catch (error) {
     console.log(error.message)
     process.exit(1)
    }

}

server()