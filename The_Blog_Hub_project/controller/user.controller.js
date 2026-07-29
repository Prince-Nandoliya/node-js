import User from "../model/user.model.js";
import HttpError from "../middleware/HttpError.js"
import auth from "../middleware/auth.js";


const add = async (req, res, next) => {
    try {

        const { Name, Email, Password,Role,Address,Phone } = req.body

        const newUser = new User({
            Name,
            Email,
            Password,
            Role,
            Address,
            Phone,
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

const logout = async (req,res,next)=>{
    try {
        
        const user = req.user


        user.tokens = user.tokens.filter((t) => t.token != req.token)
        await user.save()

        res.status(200).json({success:true,message: "user logout successfully"})

    } catch (error) {
        next(new HttpError(error.message))
    }
}


const logoutall = async (req,res,next) => {
    try {
        
        req.user.tokens = []

        await req.user.save()

        res.status(200).json({success:true,message:"logout from all device successfully"})

    } catch (error) {
        next(new HttpError(error.message))
    }
}


const deleteUser = async(req,res,next)=>{
    try {
        
        const user = req.user

        await user.deleteOne()

        res.status(200).json({success:true,message:"user delete successfully"})

    } catch (error) {
        next(new HttpError(error.message))
    }
}

const updateUser = async (req, res, next) => {
  try {
    const targetedUser = req.params.id || req.user._id;

    const user = await User.findById(targetedUser);

    const updates = Object.keys(req.body);

    let allowedFiled = ["Name", "Address", "Phone"];

    if (req.user.Role === "admin") {
      allowedFiled = [...allowedFiled, "isVerified"];
    }

    const isValidUpdate = updates.every((filed) => {
      return allowedFiled.includes(filed);
    });

    if (!isValidUpdate) {
      return next(new HttpError("only allowed filed can update", 404));
    }

    if (req.file) {
      if (user.Cloudinary_Id) {
        await cloudinary.uploader.destroy(user.Cloudinary_Id);
      }

      user.Profile_Pic = req.file.path;

      user.Cloudinary_Id = req.file.filename;
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).json({
      message: "user data updated successfully",
      user,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};


export default {add,getall,login,authlogin,logout,logoutall,deleteUser,updateUser}