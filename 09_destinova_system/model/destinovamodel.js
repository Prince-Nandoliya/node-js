import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";


const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true,
        trim: true
    },
    packagePrice: {
        type: Number,
        required: true
    },
    packagelocation: {
        type: String,
        required: true
    },
    packageduration: {
        type: String,
        required: true
    },
    packageimg: {
        type: String,
        required: true
    },
    cloudinary_id: {
        type: String,
    }
}, { timestamps: true })

const packages  = mongoose.model("package",packageSchema)

export default packages