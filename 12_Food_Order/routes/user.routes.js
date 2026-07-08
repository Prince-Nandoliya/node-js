import userController from "../controller/user.controller.js";
import express from "express"


const router = express.Router()

router.post("/add",userController.add)
router.get("/all",userController.getall)

export default router