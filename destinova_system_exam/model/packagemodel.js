import mongoose from "mongoose";

const packageSchema = mongoose.Schema({

    packageName:{
        type:String,
        required:true,
        trim:true
    },
    packagePrice:{
        type:Number,
        required:true
    },
    packageStartDate:{
        type:Date,
        required:true
    },
    packageEndDate:{
        type:Date,
        required:true
    },
    packageimg:{
        type:String,
        required:true
    },
    cloudinary_id: {
        type: String,
    }
})

const Package = mongoose.model("model",packageSchema)

export default Package;