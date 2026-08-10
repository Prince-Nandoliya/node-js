import auth from "../middleware/auth.js";
import HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";
import cloudinary from "../config/cloudinary.js"

import { WelComeEmailTemplate } from "../template/EmailTemplate.js";
import sendEmail from "../utils/sendEmail.js";


// add new user

const add = async (req, res, next) => {

    try {

        const { Name, Email, Password, Role, Address, MoNumber } = req.body

        const newuser = new User({
            Name,
            Email,
            Password,
            Role,
            Address,
            MoNumber,
            profilepic: req.file?.path,
            cloudinary_id: req.file.filename
        })

        await newuser.save()

        await sendEmail({
            to:newuser.Email,
            subject:"Welcome RoyalBite",
            html:WelComeEmailTemplate(newuser.Name),
        });

        res.status(201).json({ success: true, message: "new user add successfully", newuser })
    } catch (error) {
        next(new HttpError(error.message))

    }

}

// get all user
const getall = async (req, res, next) => {
    try {

        let {
            page = 1,
            limit = 10,
            role,
            search,
            sort = "created",
            order = "desc"
        } = req.query

        page = Number(page)

        limit = Number(limit)

        const filter = {}


        if (search) {
            filter.$or = [
                {
                    Name: {
                        $regex: search,
                        $options: "i"
                    }
                }, {
                    Email: {
                        $regex: search,
                        $options: "i"

                    }
                }
            ]
        }

        if(role){
            filter.Role = role
        }

        const sortOption = {
            [sort]: order === "asc" ? 1 : -1
        }

        const totalUsers = await User.countDocuments(filter)


        const users = await User.find(filter)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()

        if(users.length === 0){
            res.status(404).json({success:false,message:"user not found"})
        } 

        res.status(200).json({success:true,message:"user found successfully",totalUsers,totalpage:Math.ceil(totalUsers / limit),currentPage:page,users})

    } catch (error) {
        next(new HttpError(error.message))

    }


}

//user login 
const login = async (req, res, next) => {

    try {
        const { Email, Password } = req.body

        const user = await User.findByCredentials(Email, Password)

        const token = await user.genrateAuthToken()

        if (!user) {
            next(new HttpError("unable to login"))
        }

        res.status(200).json({ success: true, user, token })

    } catch (error) {
        next(new HttpError(error.message))

    }


}

const authtoken = async (req, res, next) => {
    try {

        const user = req.user;
        const token = req.token


        if (!user) {
            return next(new HttpError("unable to login", 401))
        }
        res.status(200).json({ success: true, user })

    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

// auth login

const authlogin = async (req, res, next) => {
    try {

        const user = req.user;
        const token = req.token


        if (!user) {
            return next(new HttpError("unable to login"))
        }

        res.status(200).json({ success: true, user, token })

    } catch (error) {
        next(new HttpError(error.message, 500))

    }
}

//logout user

const logout = async (req, res, next) => {
    try {

        const user = req.user


        user.tokens = user.tokens.filter((t) => t.token != req.token)
        await user.save()

        res.status(200).json({ success: true, message: "user logout successfully" })

    } catch (error) {
        next(new HttpError(error.message))
    }
}


//logout all 


const logoutall = async (req, res, next) => {
    try {
        req.user.tokens = []

        await req.user.save()


        res.status(200).json({ success: true, message: "user logout from all device successfully" })
    } catch (error) {
        next(new HttpError(error.message))
    }
}


//delete user

const deleteUser = async (req, res, next) => {
    try {

        let targetuser = req.params.id || req.user._id

        const user = await User.findById(targetuser)

        if (user.cloudinary_id) {
            await cloudinary.uploader.destroy(user.cloudinary_id);
        }

        await user.deleteOne()

        res.status(200).json({ success: true, message: "usr delete successfully" })

    } catch (error) {
        next(new HttpError(error.message))
    }

}

//update user


const updateuser = async (req, res, next) => {
    try {

        let targetuser = req.params.id || req.user._id
        console.log("ID:", req.params.id)
        console.log("Target User:", targetuser)

        const user = await User.findById(targetuser)

        if (!user) {
            return next(new HttpError("user are not found", 404))
        }
        const updates = Object.keys(req.body)

        const allowedFiled = ["Name", "password", "Address", "MoNumber"]

        const isValidUpdate = updates.every((filed) => {
            return allowedFiled.includes(filed)
        })

        if (!isValidUpdate) {
            return next(new HttpError("only allow filed can be update", 404))
        }

        if (req.file) {
            if (user.cloudinary_id) {
                await cloudinary.uploader.destroy(user.cloudinary_id)
            }
            user.profilepic = req.file.path

            user.cloudinary_id = req.file.filename
        }



        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()

        res.status(200).json({ success: true, message: "user update successfully", user })

    } catch (error) {
        next(new HttpError(error.message))
    }
}


// export controller
export default { add, getall, login, authlogin, logout, logoutall, deleteUser, updateuser }