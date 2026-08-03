import mongoose from "mongoose";


const restaurantSchema = new mongoose.Schema({

    restaurantName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"model"
    },
    openTime: {
        type: String,
        required: true
    },
    closeingTime: {
        type: String,
        required: true
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    restaurant_img: {
        type: String,
        required: true
    },
    cloudinary_id: {
        type: String
    }




}, { timestamps: true })

const restaurant = mongoose.model("restaurant", restaurantSchema)

export default restaurant