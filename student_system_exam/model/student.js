import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    grId:{
        type:Number,
        require:true,
        unique:true
    },
    moNumber:{
        type:Number,
        require:true,
        unique:true,
        minLength:10
    },
    course:{
        type:String,
        enum:["full stack","video editing","ui/ux"],
        default:"full stack"
    }


})

const student = mongoose.model("student",studentSchema)

export default student;