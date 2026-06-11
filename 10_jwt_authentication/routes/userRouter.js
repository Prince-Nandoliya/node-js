import express from "express"
import usercontroller from "../controller/usercontroller.js"

const router = express.Router()


router.post("/add", usercontroller.add)

router.get("/alluser", usercontroller.getalluser)

router.post("/login",usercontroller.login)

export default router