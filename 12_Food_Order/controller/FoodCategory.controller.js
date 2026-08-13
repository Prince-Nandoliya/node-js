import foodCategoryModel from "../model/FoodCategory.model.js";
import HttpError from "../middleware/HttpError.js"
import cloudinary from "../config/cloudinary.js";

const add = async (req, res, next) => {
    try {

        const { categoryName, Description } = req.body

        const newCategory = new foodCategoryModel({
            categoryName,
            Description,
            categoryImage: req.file?.path,
            cloudinary_id: req.file?.filename
        });

        await newCategory.save()

        res.status(201).json({ success: true, message: "new category added successfull", newCategory })


    } catch (error) {
        next(new HttpError(error.message))
    }
}



const getall = async (req, res, next) => {
    try {

        const { page = 1, limit = 10, search, sort = "createdAt", order = "desc" } = req.query

        const filter = {}

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            }
        }

        const totalCategory = await foodCategoryModel.countDocuments(filter)

        const category = await foodCategoryModel
            .find(filter)
            .sort({ [sort]: order === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit))

        if (category.length === 0) {
            return res.status(404).json({ success: false, message: "category not found" })
        }

        res.status(200).json({ success: true, message: "foodcategory data found", totalCategory, page: Number(page), totalpage: Math.ceil(totalCategory / limit), currentpage: Number(page), data: category })

    } catch (error) {
        next(new HttpError(error.message))

    }
}

const Delete = async (req, res, next) => {
    try {

        const { id } = req.params

        const category = await foodCategoryModel.findById(id)

        if (!category) {
            return next(new HttpError("category are not found", 404))
        }

        if (category.cloudinary_id) {
            await cloudinary.uploader.destroy(category.cloudinary_id)
        }

        await foodCategoryModel.findByIdAndDelete(id)


        res.status(200).json({ success: true, message: "category delete successfully" })

    } catch (error) {
        next(new HttpError(error.message))
    }
}

const update = async (req, res, next) => {
    try {

        const { id } = req.params

        const categoryupdate = await foodCategoryModel.findById(id)

        if (!categoryupdate) {
            return next(new HttpError("category data not found with this id", 404))
        }

        const updates = Object.keys(req.body)

        const allowfield = ["categoryName", "Description"];

        const isValidUpdates = updates.every((field) =>
            allowfield.includes(field)
        )

        if(!isValidUpdates){
            return next(new HttpError("only alloe field can be update",400))
        }

        updates.forEach((update) => {
            categoryupdate[update] = req.body[update]
        })

        if(req.file){
            if(categoryupdate.cloudinary_id){
                await cloudinary.uploader.destroy(categoryupdate.cloudinary_id)
            }

            categoryupdate.categoryImage = req.file.path
            categoryupdate.cloudinary_id = req.file.filename
        }

        await categoryupdate.save()

        res.status(200).json({success:true,message:"category update successfully",data:categoryupdate})

    } catch (error) {
        next(new HttpError(error.message))

    }
}

export default { add, getall, Delete,update }