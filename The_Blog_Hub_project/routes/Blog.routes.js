import BlogController from "../controller/Blog.controller.js"
import uploads from "../middleware/uploads.js"
import express from "express"

const router = express.Router()

router.post("/add",uploads.single("Blogimg"),BlogController.add)

export default router