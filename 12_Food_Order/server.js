// third party or external module

import express from "express"
import dotenv from "dotenv"

// local modules

import HttpError from "./middleware/HttpError.js"
import connectDB from "./config/db.js"

import router from "./routes/user.routes.js"
import adminrouter from "./routes/admin.routes.js"
import restaurantRouter from "./routes/restaurant.routes.js"
import providerRouter from "./routes/Provider.routes.js"
import categoryRouter from "./routes/FoodCategory.routes.js"

import restaurant from "./model/restaurants.model.js"
import User from "./model/user.model.js"

// dotenv config
dotenv.config({ path: "./.env" })


const app = express()

app.use(express.json())

// server check
app.get("/", (req, res) => {
    res.json("hello from server")
})

app.use("/user", router)
app.use("/admin",adminrouter)
app.use("/restaurant",restaurantRouter)
app.use("/provider",providerRouter)
app.use("/category",categoryRouter)

// if route not found
app.use((req, res, next) => {
    next(new HttpError("requested routes are not found"))
})

// centralize error handling
app.use((Error, req, res, next) => {
    if (res.headersSent) {
        return next(Error)
    }

    res.status(Error.StatusCode || 500).
        json({ message: Error.message || "internal server error" })
})

// server port
const port = 5000



// start server

async function server() {
    try {

        // connect database
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
       console.log(error.message)
        process.exit(1)

    }

}

// call server function
server()



// async function check(){
//     const restaurantData = await restaurant.findById("6a607c151b46a49440c5d350")
//     .populate("owner","Name Email MoNumber")
//     console.log(restaurantData)
// }

// check()


// async function virtualUser(){
//     try {
        
//         const user = await User
//         .findById("6a5eff3fed68e287c79c336d").populate("restaurant")
//         console.log(user)

//     } catch (error) {
//         next(new HttpError(error.message))
//     }
    
// }

// virtualUser()
