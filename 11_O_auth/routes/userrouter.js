import express from "express"
import passport from "passport"
import HttpError from "../middleware/HttpError.js"
import user from "../model/usermodel.js"

const router = express.Router()

router.get("/login", (req, res) => {

    res.render("login")
})

router.get("/google", passport.authenticate("google", {
    scope: ["email", "profile"],
    
})
)


router.get("/google/login", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/profile")
})

router.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            next(new HttpError("fail to logout"))
        }
    })

    res.redirect("/")
})



export default router