import express from "express"
import passport from "passport"
import HttpError from "../middleware/HttpError.js"

const router = express.Router()

router.get("/login", (req, res) => {

    res.render("login")
})

router.get("/googel", passport.authenticate("googel", {
    scope: ["email", "profile"],
}),
)

export default router