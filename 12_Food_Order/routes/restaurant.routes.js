import restaurantController from "../controller/restaurant.controller.js";
import auth from "../middleware/auth.js";
import uploads from "../middleware/uploads.js";
import express from "express"
import validate from "../middleware/validate.js";
import restaurantSchema from "../validation/restaurantSchema.js";


const router = express.Router()


router.post("/add", auth, uploads.single("restaurant_img"), validate(restaurantSchema), restaurantController.add)

export default router