import userController from "../controller/user.controller.js";
import express from "express"
import auth from "../middleware/auth.js";

import validate from "../middleware/validate.js";
import registerSchema from "../validation/userSchema.js";


const router = express.Router()

router.post("/add", validate(registerSchema), userController.add)
router.get("/all", userController.getall)

router.post("/login", userController.login)
router.post("/authlogin", auth, userController.authlogin)

router.get("/logout",auth,userController.logout)
router.get("/logoutall",auth,userController.logoutall)

router.delete("/delete",auth,userController.deleteUser)
export default router