import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unqiue: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true,
        enum: ["customer", "provider", "admin"],
        default: "customer"
    },
    Address: {
        type: String,
        required: true
    },
    MoNumber: {
        type: Number,
        required: true
    },
    profilepic:{
        type:String
    },
    cloudinary_id:{
        type:String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],


}, { timestamps: true })



userSchema.pre("save", async function () {
    const user = this

    if (this.isModified("Password")) {
        user.Password = await bcrypt.hash(user.Password, 10)

    }

})


userSchema.statics.findByCredentials = async function (Email, Password) {
    try {

        const user = await this.findOne({ Email })

        if (!user) {
            throw new Error("unable to login")
        }

        const isMatched = await bcrypt.compare(Password, user.Password)
        if (!isMatched) {
            throw new Error("unable to login")
        }
        return user

    } catch (error) {
        console.log(error)
        throw new Error(Error.message)
    }

}



userSchema.methods.genrateAuthToken = async function () {
    try {

        const user = this

        const token = jwt.sign(
            {_id:user._id.toString()},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        if(!token){
            throw new Error("fail to genrate token")
        }

        user.tokens = user.tokens.concat({token})


        await user.save()
        return token


    } catch (error) {
        throw new Error(error.message)

    }

}



userSchema.methods.toJSON = function(){
    const user = this


    const userObject = user.toObject()


    delete userObject.Password;

    delete userObject.tokens;

    delete userObject.__v

    delete userObject.createdAt

    delete userObject.updatedAt


    return userObject
}
const user = mongoose.model("model", userSchema)

export default user