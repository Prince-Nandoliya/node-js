import foodModel from "../model/Food.model.js";
import httpError from "../middleware/HttpError.js"
import cloudinary from "../config/cloudinary.js"



const add = async (req, res, next) => {
    try {

        const { foodName, foodPrice, foodDescription, restaurantName, owner, preparingTime,category } = req.body

        const newfood = new foodModel({
            foodName,
            foodPrice,
            foodDescription,
            restaurantName,
            owner,
            preparingTime,
            category,
            foodImage: req.files?.map((file) => file.path) || [],
            cloudinary_id: req.files?.map((file) => file.filename) || [],
        })

        await newfood.save();

        res.status(201).json({success:true,message:"new food added successfully",newfood})

    } catch (error) {
        next(new httpError(error.message))

    }
}

export default {add}