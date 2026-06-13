import express from "express"
import uploads from "../middleware/uploads.js"
import controller from "../controller/controller.js"

const router = express.Router()

router.post("/add",uploads.single("packageimg"),controller.add)


export default router