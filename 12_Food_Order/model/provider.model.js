import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({

    providerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "model",
        require: true
    },

    restaurants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
        required: true
    },
    document: [{
        type: String,
        required: true
    }],

    cloudinary_id: [
        {
            type: String,
            required: true
        }
    ],
    AccountNo: {
        type: String,
        required: true

    },
    isVerifield: {
        type: Boolean
    },
}, {
    timestamps: true
})

const providerModel = mongoose.model("provider", providerSchema)

export default providerModel