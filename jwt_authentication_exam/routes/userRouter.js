import usercontroller from "../controller/usercontroller.js";
import express from "express"
import auth from "../middleware/auth.js"

const router = express.Router()

router.post("/add",usercontroller.add)

router.get("/all",usercontroller.getall)

router.post("/login",usercontroller.login)
router.delete("/delete",auth,usercontroller.deleteuser)
router.get("/authlogin",auth,usercontroller.authlogin)
router.post("/authlogout",auth,usercontroller.logOut)

export default router