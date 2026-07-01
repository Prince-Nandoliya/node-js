import express from "express"
import HttpError from "./middleware/HttpError.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import router from "./routes/userrouter.js"
import profileRouter from "./routes/profileRouter.js"
import pasport from "./config/passport.js"
import session from "express-session"

dotenv.config({ path: "./.env" })
const app = express()



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

app.use(pasport.initialize())
app.use(pasport.session())

app.use("/auth", router)
app.use("/profile", profileRouter)

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("home",{user: req.user})
})



app.use((req, res, next) => {
    next(new HttpError("requested routes are not found"))
})




app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error)
    }

    res.status(error.statusCode || 500)
        .json({ message: error.message || "internal server error" })
});

const port = 5000




async function server() {
    try {

        const connect = await connectDB()

        if (!connect) {
            throw new Error(" fail to connect db");

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