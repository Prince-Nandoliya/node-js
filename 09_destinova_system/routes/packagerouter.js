import express from "express"
import uploads from "../middleware/uploads.js"
import controller from "../controller/controller.js"

const router = express.Router()

router.post("/add",uploads.single("packageimg"),controller.add)

router.get("/all",controller.getall)

router.get("/:id",controller.getid)

router.delete("/:id",controller.deletepackage)

router.patch("/:id",uploads.single("packageimg"),controller.updatepackage)

export default router