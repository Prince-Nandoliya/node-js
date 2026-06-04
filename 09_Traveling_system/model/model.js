import mongoose from "mongoose"


const packageschema = mongoose.Schema({

    packageName: {
        Type: String,
        required: true,
        trim: true
    },
    packagePrice: {
        Type: Number,
        required: true
    },
    StartDate: {
        Type: Date,
        required: true
    },
    EndDate: {
        Type: Date,
        required: true
    },
    packageDescripton: {
        Type: String,
        required: true
    },
    packageImg: {
        Type: String,
        required: true
    }

}, {
    timestamps: true
})

const package = mongoose.model("package", packageschema)

export default package