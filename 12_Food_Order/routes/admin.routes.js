import express from "express"
import userController from "../controller/user.controller.js"
import auth from "../middleware/auth.js"
import {profilepic} from "../middleware/uploads.js"
import checkRole from "../middleware/CheckRole.js"

const router = express.Router()

router.patch("/update/:id",auth,checkRole("admin"),profilepic.single("profilepic"),userController.updateuser)
router.delete("/delete/:id",auth,checkRole("admin"),userController.deleteUser)

export default router