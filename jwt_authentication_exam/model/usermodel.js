import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import HttpError from "../middleware/HttpError.js";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true })

userSchema.pre("save", async function () {

    const user = this

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10)
    }
})

userSchema.statics.findByCredentials  = async function (email, password) {

    try {

        const user = await this.findOne({ email })
        if (!user) {
            throw new Error("unable to login")
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            throw new Error("unable to login")
        }

        return user

    } catch (error) {
        throw new Error(error.message)
    }

}
userSchema.methods.genrateAuthToken = async function () {
    try {

        const user = this


        const token = jwt.sign(
            { _id: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "6d" }
        )
       

        if (!token) {
            throw new Error("fail to genrate token")
        }

        user.tokens = user.tokens.concat({ token })

        await user.save()

        return token


    } catch (error) {
        throw new Error(error.message)

    }
}




const user = mongoose.model("user", userSchema)

export default user