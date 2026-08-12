import foodCategoryModel from "../model/FoodCategory.model.js";
import HttpError from "../middleware/HttpError.js"

const add = async (req, res, next) => {
    try {

        const { categoryName, Description } = req.body

        const newCategory =  new foodCategoryModel({
            categoryName,
            Description,
            categoryImage: req.file?.path,
            cloudinary_id: req.file?.filename
        });

        await newCategory.save()

        res.status(201).json({success:true,message:"new category added successfull",newCategory})


    } catch (error) {
     next(new HttpError(error.message))
    }
}

export default {add}