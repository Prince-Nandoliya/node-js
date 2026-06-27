import express from "express"
import passport from "passport"
import HttpError from "../middleware/HttpError.js"

const router = express.Router()

router.get("/login", (req, res) => {

    res.render("login")
})

router.get("/google", passport.authenticate("google", {
    scope: ["email", "profile"],
}),
)


router.get("/google/login",passport.authenticate("google",{failureRedirect:"/"}),(req,res)=>{
    res.send("this is callback url")
})

export default router