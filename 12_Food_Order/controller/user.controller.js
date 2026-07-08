import HttpError from "../middleware/HttpError.js";
import user from "../model/user.model.js";



// add new user

const add = async (req,res,next)=>{

    const {Name,Email,Password,Role,Address,MoNumber} = req.body

    const newuser = new user({
        Name,
        Email,
        Password,
        Role,
        Address,
        MoNumber
    })

    await newuser.save()

    res.status(201).json({success:true,message:"new user add successfully",newuser})
    
}
// get all user
const getall = async (req,res,next)=>{

    const users = await user.find({})

    if(users.length <= 0){
        return res.status(404).json({success:false,message:"no user found"})
    }

    res.status(200).json({success:true,message:"all user found successfully",users})
}

// export controller
export default {add,getall}