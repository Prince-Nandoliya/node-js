import BlogController from "../controller/Blog.controller.js"
import uploads from "../middleware/uploads.js"
import express from "express"
import auth from "../middleware/auth.js"
import validate from "../middleware/validate.js"
import {BlogSchema} from "../validation/Blog.validation.js"
import { updateBlogSchema } from "../validation/Blog.validation.js"

const router = express.Router()

router.post("/add",auth,uploads.single("Blogimg"),validate(BlogSchema),BlogController.add)

router.get("/all",auth,BlogController.getall)

router.delete("/delete/:id",auth,BlogController.Delete)

router.patch("/update/:id",auth,uploads.single("Blogimg"),validate(updateBlogSchema),BlogController.update)



export default router