import express from "express"
import usercontroller from "../controller/usercontroller.js"
import auth from "../middleware/auth.js"

const router = express.Router()


router.post("/add", usercontroller.add)

router.get("/alluser", usercontroller.getalluser)

router.post("/login",usercontroller.login)

router.get("/authlogin",auth,usercontroller.authlogin)

export default router