import express from "express"
import usercontroller from "../controller/usercontroller.js"
import auth from "../middleware/auth.js"

const router = express.Router()


router.post("/add", usercontroller.add)

router.get("/alluser", usercontroller.getalluser)

router.post("/login", usercontroller.login)

router.get("/authlogin", auth, usercontroller.authlogin)

router.post("/logout", auth, usercontroller.logOut)

router.get("/logoutAll", auth, usercontroller.logoutAll)

router.delete("/delete", auth, usercontroller.deleteuser)

router.patch("/update",auth,usercontroller.updateuser)

export default router