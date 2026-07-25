import userController from "../controller/user.controller.js";
import express from "express"
import auth from "../middleware/auth.js";
import uploads from "../middleware/uploads.js";


const router = express.Router()

router.post("/add",uploads.single("profile_pic"),userController.add)

router.get("/all",userController.getall)

router.get("/login",userController.login)

router.get("/authlogin",auth,userController.authlogin)

export default router