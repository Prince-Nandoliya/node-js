import express from "express"
import HttpError from "./middleware/HttpError.js"
import connectDB from "./config/db.js"
import router from "./routes/userrouter.js"
import session from "express-session"
import passport from "./config/passport.js"
import profile from "./routes/profile.js"

import dotenv from "dotenv"
const app = express()

dotenv.config({path: "./.env"})


app.get("/", (req, res) => {
    res.render("home")
})

app.set("view engine","ejs")

app.use(express.json())


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
})
)

app.use(passport.initialize())
app.use(passport.session())
app.use("/auth",router)
app.use("/profile", profile);


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