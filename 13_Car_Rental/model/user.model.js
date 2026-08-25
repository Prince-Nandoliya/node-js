import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: true
    }
})

const User = mongoose.model("User", userSchema)

export default User