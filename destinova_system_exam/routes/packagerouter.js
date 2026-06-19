import express from "express"
import packagecontroller from "../controller/packagecontroller.js"
import uploads from "../middleware/uploads.js"

const router = express.Router()

router.post("/add", uploads.single("packageimg"), packagecontroller.add)

router.get("/all", packagecontroller.getall)

router.delete("/:id", packagecontroller.deletepackage)

router.patch("/:id", uploads.single("packageimg"), packagecontroller.updatepackage)


export default router