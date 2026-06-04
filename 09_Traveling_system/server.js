import express from "express"

import HttpError from "./middleware/HttpError.js"

import connectDB from "./config/db.js"
import mongoose from "mongoose"

import dotenv from "dotenv" 

dotenv.config({ path: "./.env" })


const app = express()


app.get("/", (req, res, next) => {
    res.send("hello from server")
})

app.use((req, res, next) => {
    return next(new HttpError("requested routues are not found", 404))
})

const port = 5000

async function server() {

    try {
        const connect = await connectDB()

    if (!connect) {
        throw new Error("failed to connected")
    }

    app.listen(port, (Error) => {
        if (Error) {
            return console.log(Error.message)
        }

        console.log(`server runing on port ${port}`)
    })
        
    } catch (error) {
        console.log(error.message)
        process.exit(1)
        
    }

}
server()