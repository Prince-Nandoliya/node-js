import mongoose from "mongoose";


const foodCategorySchema = new mongoose.Schema({

    categoryName: {
        type: String,
        required: true,
        enum: [
            "Gujarati",
            "Chinese",
            "South Indian",
            "Desserts",
            "Punjabi",
            "Fast Food"

        ],
        trim: true
    },
    Description: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String,
        required: true
    },
    cloudinary_id: {
        type: String,
        
    }
}, { timestamps: true })


const foodCategoryModel = mongoose.model("foodCategory", foodCategorySchema)

export default foodCategoryModel