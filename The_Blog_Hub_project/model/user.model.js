import mongoose from "mongoose"
import bcrypt from "bcrypt"


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

})

userSchema.pre("save",async function() {
    const user = this

    if(user.isModified("Password")){
        user.Password = await bcrypt.hash(user.Password,10)
    }
})

const User = mongoose.model("user",userSchema)

 export default User