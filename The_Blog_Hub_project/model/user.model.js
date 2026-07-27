import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    Profile_pic:{
        type:String
    },
    cloudinary_id:{
        type:String
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

},{timestamps:true})

userSchema.pre("save",async function() {
    const user = this

    if(user.isModified("Password")){
        user.Password = await bcrypt.hash(user.Password,10)
    }
})


userSchema.statics.findByCredentials = async function (Email,Password) {
    try {
        
        const User = await this.findOne({Email})

        if(!User){
            throw new Error("unable to login")
        }

        const isMatched = await bcrypt.compare(Password,User.Password)

        if(!isMatched){
            throw new Error("unable to login")
        }

        return User

    } catch (error) {
        throw new Error(error.message)
    }
    
}

userSchema.methods.genrateAuthToken = async function(){
    try {
        
        const User = this

        const token = jwt.sign(
            {_id: User._id.toString()},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )

        if(!token){
            throw new Error("fail to genrate token")
        }

        User.tokens = User.tokens.concat({ token})

        await User.save()

        return token

    } catch (error) {
        throw new Error(error.message)
    }
    
}

const User = mongoose.model("user",userSchema)

 export default User