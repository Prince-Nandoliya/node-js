import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    foodPrice: {
        type: Number,
        required: true
    },
    foodDescription: {
        type: String,
        required: true
    },
    foodImage: [{
        type: String,
        required: true
    }],
    cloudinary_id: [{
        type: String,
        required: true

    }],
    restaurantName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
        required: true

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    preparingTime:{
        type:String,
        min:1,
        max:30,
        required:true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodCategory",
        required: true
    }
}, { timestamps: true })

const foodModel = mongoose.model("food", foodSchema)

export default foodModel