import express from "express"
import EmployeeController from "../controller/Employee.controller.js"
import auth from "../middleware/auth.js"


const router = express.Router()

router.post("/add", EmployeeController.add)
router.get("/Login",EmployeeController.login)

router.get("/all",auth,EmployeeController.getAll)
router.get("/authlogin",auth,EmployeeController.authLogin)

router.get("/logout",auth,EmployeeController.logout)
router.get("/logoutall",auth,EmployeeController.logoutall)

router.delete("/delete",auth,EmployeeController.Delete)
router.patch("/update",auth,EmployeeController.update)


export default router
