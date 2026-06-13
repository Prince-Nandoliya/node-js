import packages from "../model/destinovamodel.js"
import HttpError from "../middleware/HttpError.js"
import cloudinary from "../config/cloudinary.js"


const add = async(req,res,next)=>{

    try {
        

        const {packageName,packagePrice,packagelocation,packageduration} = req.body

        if(!packageName || !packagePrice || !packagelocation || !packageduration){
            return next(new HttpError("all the filed are required",400))
        }

        const newpackage = new packages({
            packageName,
            packagePrice,
            packagelocation,
            packageduration,
            packageimg:req.file?.path,
            cloudinary_id: req.file.filename
        });

        await newpackage.save()

        res.status(201).json({success:true,message:"new package added successfully",newpackage})

    } catch (error) {
        next(new HttpError(error.message,500))
    }
}
export default {add}