
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({

    BlogTitle: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        enum:["Business","Travel","Travel"],
        required:true
    },
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Blogimg:{
        type:String,
        required:true
    },
    cloudinary_id:{
        type:String
    }


},{timestamps:true})

const Blog = mongoose.model("Blog",BlogSchema)

export default Blog