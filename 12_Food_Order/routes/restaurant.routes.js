import restaurantController from "../controller/restaurant.controller.js";
import auth from "../middleware/auth.js";
import {restaurant_img} from "../middleware/uploads.js";
import express from "express"
import checkRole from "../middleware/CheckRole.js"
import validate from "../middleware/validate.js";
import restaurantSchema from "../validation/restaurantSchema.js";


const router = express.Router()


router.post("/add", auth, restaurant_img.single("restaurant_img"), validate(restaurantSchema), restaurantController.add)

router.delete("/delete/:id",auth,checkRole("admin"),restaurantController.Delete)

router.get("/all",auth,restaurantController.getall)

router.patch("/update/:id",auth,checkRole("admin"),restaurantController.update)

export default router