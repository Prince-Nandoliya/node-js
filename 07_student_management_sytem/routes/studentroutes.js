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

<<<<<<< HEAD
router.patch("/:id",studentController.updatestudent)
=======
router.patch("/:id",studentController.Studentbyid)
>>>>>>> 51917ffb07b630059b7853f72d87cd3b61302b33

export default router

















