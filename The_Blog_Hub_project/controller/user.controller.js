import User from "../model/user.model.js";
import HttpError from "../middleware/HttpError.js"
import auth from "../middleware/auth.js";


const add = async (req, res, next) => {
    try {

        const { Name, Email, Password } = req.body

        const newUser = new User({
            Name,
            Email,
            Password,
            Profile_pic: req.file?.path,
            cloudinary_id: req.file.filename
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


const login = async(req,res,next)=>{
    try {
        
        const {Email,Password} = req.body

        const user = await User.findByCredentials(Email,Password)

        const token = await user.genrateAuthToken()

        if(!user){
            next(new HttpError("unable to login"))
        }

        res.status(200).json({success:true,user})


    } catch (error) {
        next(new HttpError(error.message))
    }
}


const authtoken = async(req,res,next)=>{
    try {
        
        const user = req.body

        if(!user){
            return next(new HttpError("unable to login",401))
        }

        res.status(200).json({success:true,user})

    } catch (error) {
        next(new HttpError(error.message,500))
    }
}


const authlogin = async (req,res,next)=>{
    try {
        
        const user = req.user

        if(!user){
            return next(new HttpError("unable to login"))
        }

        res.status(200).json({success:true,user})

    } catch (error) {
        next(new HttpError(error.message,500))
    }
}


export default {add,getall,login,authlogin}