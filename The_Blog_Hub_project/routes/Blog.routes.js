import BlogController from "../controller/Blog.controller.js"
import uploads from "../middleware/uploads.js"
import express from "express"
import auth from "../middleware/auth.js"

const router = express.Router()

router.post("/add",auth,uploads.single("Blogimg"),BlogController.add)

router.get("/all",auth,BlogController.getall)

router.delete("/delete/:id",auth,BlogController.Delete)

router.patch("/update/:id",auth,uploads.single("Blogimg"),BlogController.update)



export default router