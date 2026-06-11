import express from "express"
import usercontroller from "../controller/usercontroller.js"

const router = express.Router()


router.post("/add",usercontroller.add)

export default router