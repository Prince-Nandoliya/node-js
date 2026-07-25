import User from "../model/user.model.js";
import HttpError from "../middleware/HttpError.js"


const add = async (req, res, next) => {
    try {

        const { Name, Email, Password } = req.body

        const newUser = new User({
            Name,
            Email,
            Password
        })

        await newUser.save()

        res.status(201).json({success:true,message:"new add successfully",newUser})

    } catch (error) {
        next(new HttpError(error.message))

    }
}

const getall = async (req,res,next)=>{
    try {
        
        const user = await User.find({})

        if(!user){
            res.status(404).json({success:false,message:"no user data found"})
        }

        res.status(200).json({success:true,total:user.length,message:"user data found successfully",user})

    } catch (error) {
        next(new HttpError(error.message))
    }
}

export default {add,getall}