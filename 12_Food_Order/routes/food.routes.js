import foodController from "../controller/food.controller.js";
import express from "express"
import auth from "../middleware/auth.js"
import CheckRole from "../middleware/CheckRole.js"
import {foodImage} from "../middleware/uploads.js"
import checkRole from "../middleware/CheckRole.js";


const router = express.Router()

router.post("/add",auth,checkRole("admin","provider"),foodImage.array("foodImage",5),foodController.add)

export default router