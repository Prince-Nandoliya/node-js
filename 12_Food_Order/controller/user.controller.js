import auth from "../middleware/auth.js";
import HttpError from "../middleware/HttpError.js";
import user from "../model/user.model.js";



// add new user

const add = async (req, res, next) => {

    try {

        const { Name, Email, Password, Role, Address, MoNumber } = req.body

        const newuser = new user({
            Name,
            Email,
            Password,
            Role,
            Address,
            MoNumber
        })

        await newuser.save()

        res.status(201).json({ success: true, message: "new user add successfully", newuser })
    } catch (error) {
        next(new HttpError(error.message))

    }

}

// get all user
const getall = async (req, res, next) => {
    try {

        const users = await user.find({})

        if (users.length <= 0) {
            return res.status(404).json({ success: false, message: "no user found" })
        }

        res.status(200).json({ success: true, message: "all user found successfully", users })
    } catch (error) {
        next(new HttpError(error.message))

    }


}

//user login 
const login = async (req, res, next) => {

    try {
        const { Email, Password } = req.body

        const users = await user.findByCredentials(Email, Password)

        const token = await users.genrateAuthToken()

        if (!users) {
            next(new HttpError("unable to login"))
        }

        res.status(200).json({ success: true, users, token })

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


//delete user

const deleteUser = async (req,res,next)=>{
    try {

        const user = req.user

        await user.deleteOne()

        res.status(200).json({success:true,message:"usr delete successfully"})
        
    } catch (error) {
        next(new HttpError(error.message))
    }
    
}


// export controller
export default { add, getall, login, authlogin,deleteUser }