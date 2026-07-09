import userController from "../controller/user.controller.js";
import express from "express"

import validate from "../middleware/validate.js";
import registerSchema from "../validation/userSchema.js";


const router = express.Router()

router.post("/add",validate(registerSchema),userController.add)
router.get("/all",userController.getall)

router.get("/login",userController.login)
export default router