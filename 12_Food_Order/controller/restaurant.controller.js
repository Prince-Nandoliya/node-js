import restaurant from "../model/restaurants.model.js";
import HttpError from "../middleware/HttpError.js";


const add = async(req,res,next)=>{
    try {
        console.log(req.body);

        const {restaurantName,description,state,city,Address,openTime,closeingTime} = req.body

        const newrestaurnat = new restaurant({
            restaurantName,
            description,
            state,
            city,
            Address,
            owner:req.user._id,
            openTime,
            closeingTime,
            restaurant_img: req.file?.path,
            cloudinary_id: req.file.filename
        })

        await newrestaurnat.save()

        res.status(201).json({success:true,message:"restaurant add successfully",newrestaurnat})


    } catch (error) {
        next(new HttpError(error.message))
    }
}

export default {add}