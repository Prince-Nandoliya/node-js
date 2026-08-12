import FoodCategoryController from "../controller/FoodCategory.controller.js";
import express from "express"
import auth from "../middleware/auth.js"
import CheckRole from "../middleware/CheckRole.js"
import {categoryImage} from "../middleware/uploads.js"
import checkRole from "../middleware/CheckRole.js";


const router = express.Router()

router.post("/addcategory",auth,categoryImage.single("categoryImage"),checkRole("admin"),FoodCategoryController.add)

export default router