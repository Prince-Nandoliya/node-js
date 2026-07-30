import cloudinary from "../config/cloudinary.js";
import HttpError from "../middleware/HttpError.js";
import Blog from "../model/Blog.model.js";


const add = async (req, res, next) => {
    try {

        const { BlogTitle, Category, content, description } = req.body

        const newblog = new Blog({
            BlogTitle,
            Category,
            content,
            description,
             Author: req.user._id,
            Blogimg: req.file?.path,
            cloudinary_id: req.file.filename
        })

        await newblog.save()

        res.status(201).json({ success: true, message: "new Blog add successfully", newblog })


    } catch (error) {
        next(new HttpError(error.message))
    }
}


const getall = async (req, res, next) => {
    try {
        const BlogData = await Blog.find().populate("Author", "-_id");
        

        res.status(200).json({ success: true, message: "all blog found successfully", BlogData })

    } catch (error) {
        next(new HttpError(error.message))
    }
}


const Delete = async (req, res, next) => {
    try {

        const targetuser = req.params.id

        const BlogData = await Blog.findById(targetuser)




        if (BlogData.cloudinary_id) {
            await cloudinary.uploader.destroy(BlogData.cloudinary_id)
        }

        await Blog.deleteOne()

        res.status(200).json({ success: true, message: "Blog delete successfully" })


    } catch (error) {
        next(new HttpError(error.message))
    }
}

const update = async (req, res, next) => {
    try {

        const BlogData = await Blog.findById(req.params.id)


        console.log(BlogData)

        if (!BlogData) {
            return next(new HttpError("Blog not found", 404))
        }

        const updates = Object.keys(req.body)

        const allowField = [
            "BlogTitle",
            "Category",
            "content",
            "description",
            "Blogimg"
        ]

        const isValidUpdate = updates.every((field) =>
            allowField.includes(field)
        )

        if (!isValidUpdate) {
            return next(new HttpError("only allowField can be update"))
        }

        if (req.file) {

            if (BlogData.cloudinary_id) {
                await cloudinary.uploader.destroy(BlogData.cloudinary_id)
            }

            BlogData.Blogimg = req.file.path
            BlogData.cloudinary_id = req.file.filename
        }


        updates.forEach((field) => {
            BlogData[field] = req.body[field]
        })

        await BlogData.save()

        res.status(200).json({ success: true, message: "Blog update successfully", BlogData })

    } catch (error) {
        next(new HttpError(error.message))
    }
}
export default { add, getall, Delete, update }