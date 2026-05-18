import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true,
    },
    grid:{
        type: Number,
        required: true,
        unique:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    course: {
        type: String,
        enum: ["fullstack","ui/ux design","video editing"],
        required: true,
    },
    isActive: {
        type: String,
        enum: ["active","hold","pending","suspend"],
        default: "active"
    },
    mobileNumber: {
        type: Number,
        minLength: 10,
        required: true,
    }

})

const Student = mongoose.model("studentData",studentSchema)

export default Student