import userController from "../controller/user.controller.js";
import express from "express"
import auth from "../middleware/auth.js";
import {registerSchema} from "../validation/user.validation.js"
import { updateUserSchema } from "../validation/user.validation.js";
import uploads from "../middleware/uploads.js";
import validate from "../middleware/validate.js"


const router = express.Router()

router.post("/add",uploads.single("profile_pic"),validate(registerSchema),userController.add)

router.get("/all",userController.getall)

router.get("/login",userController.login)

router.get("/authlogin",auth,userController.authlogin)

router.get("/logout",auth,userController.logout)

router.get("/logoutall",auth,userController.logoutall)

router.delete("/delete",auth,userController.deleteUser)

router.patch("/update",auth,validate(updateUserSchema),uploads.single("Profile_pic"),userController.updateUser)

export default router