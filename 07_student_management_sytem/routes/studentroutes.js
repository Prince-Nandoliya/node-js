// import express from "express"
// import studentController from "../Controller/studentController.js"

// const router = express.Router()

// router.post("/add",studentController.add)

// router.get("/getAllStudents",studentController.getAllStudentData)

// export default router



import express from "express"
import studentController from "../Controller/studentController.js"


const router = express.Router()

router.post("/add",studentController.add)

router.get("/getAllStudents",studentController.getAllStudentData)

router.delete("/:id",studentController.deletestudent)

export default router

















