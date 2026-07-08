import HttpError from "../middleware/HttpError.js";
import user from "../model/user.model.js";



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


export default {add}