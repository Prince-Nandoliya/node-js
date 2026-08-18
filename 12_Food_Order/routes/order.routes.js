import express from "express"
import orderController from "../controller/order.controller.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.post("/addorder",auth,orderController.addOrder)

export default router