import express from "express"

import userController from "../controller/user.controller.js"
import validate from "../middleware/validate.js"
import auth from "../middleware/auth.js"
import checkRole from "../middleware/checkRole.js"
import uploads from "../middleware/uploads.js"


const router = express.Router()

router.delete(
    "/delete/:id",
    auth,
    checkRole("admin"),
    userController.deleteUser
)

router.patch(
    "/update/:id",
    auth,
    checkRole("admin"),
    uploads.single("Profile_pic"),
    userController.updateUser
)


export default router