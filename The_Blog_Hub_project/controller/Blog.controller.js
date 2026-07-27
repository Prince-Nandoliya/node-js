import HttpError from "../middleware/HttpError.js";
import Blog from "../model/Blog.model.js";


const add = async(req,res,next)=>{
    try {
        
        const {BlogTitle,Category,content,description} = req.body

        const newblog = new Blog({
            BlogTitle,
            Category,
            content,
            description,
            Blogimg: req.file?.path,
            cloudinary_id :req.file.filename
        })

        await newblog.save()

        res.status(201).json({success:true,message:"new Blog add successfully",newblog})


    } catch (error) {
        next(new HttpError(error.message))
    }
}

export default {add}