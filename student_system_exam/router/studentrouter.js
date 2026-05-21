import express from "express"

import studentController from "../controller/studentController.js";

const router = express.Router()

router.get("/add",studentController.add)

router.get("/allStudentData",studentController.allStudentData)

router.delete("/delete/:id",studentController.studentdelete)

router.patch("/update/:id",studentController.studentupdate)

export default router