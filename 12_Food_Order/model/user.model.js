import mongoose from "mongoose"
import bcrypt from "bcryptjs"


const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unqiue:true
    },
    Password:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        required:true,
        enum:["customer","provider","admin"],
        default:"customer"
    },
    Address:{
        type:String,
        required:true
    },
    MoNumber:{
        type:Number,
        required:true
    }


},{timestamps:true})



userSchema.pre("save",async function () {
    const user = this

    if(this.isModified("Password")){
        user.Password = await bcrypt.hash(user.Password,10)

    }
    
})


const user = mongoose.model("model",userSchema)

export default user