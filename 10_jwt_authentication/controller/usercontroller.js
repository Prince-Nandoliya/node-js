import HttpError from "../middleware/HttpError.js"
import user from "../model/usermodel.js"



const add = async (req, res, next) => {
    try {

        const { name, email, password } = req.body

        const newuser = new user({
            name,
            email,
            password
        })

        await newuser.save()


        res.status(201).json({ success: true, message: "new user added successfully", newuser })

    } catch (error) {
        next(new HttpError(error.message, 500))

    }
}

const getalluser = async (req, res, next) => {
    try {
        const users = await user.find({})

        if (!users) {
            res.status(404).json({ success: false, message: "no users data found" })
        }

        res.status(200).json({ success: true, total: users.length, message: "users data found successfully", users })


    } catch (error) {
        next(new HttpError(error.message))
    }
}

const login = async (req, res, next) => {
    try {


        const { email, password } = req.body

        const users = await user.findByCredentials(email, password)

        const token = await users.genrateAuthToken()

        if (!users) {
            next(new HttpError("unable to login"))
        }

        res.status(200).json({ success: true, users })

    } catch (error) {
        next(new HttpError(error.message))
    }
}

const authtoken = async (req, res, next) => {
    try {

        const user = req.body
        // console.log("user",user)

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

        const user = req.user

        console.log("user",user)

        if (!user) {
            return next(new HttpError("unable to login"))
        }

        res.status(200).json({ success: true, user })

    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}


const logOut = async (req, res, next) => {
    try {
        const token = req.token

        // console.log("token",token)

        req.user.tokens = req.user.tokens.filter((t) => t.token != token)

        req.user.save()

        res.status(200).json({ success: true, message: "user logout successfully" })


    } catch (error) {
        next(new HttpError(error.message, 500))

    }
}


const logoutAll = async (req, res, next) => {
    try {

        // console.log("Before:", req.user.tokens);

        req.user.tokens = [];

        await req.user.save()

        // console.log("After:", req.user.tokens);

        res.status(200).json({ success: true, message: "user logOut from all device successfully" })

    } catch (error) {
        next(new HttpError(error.message))

    }
}

const deleteuser = async (req, res, next) => {
    try {


        const user = req.user
        // console.log("user",user)

        await user.deleteOne()

        res.status(200).json({ success: true, message: "user delete successfully" })
    } catch (error) {

        next(new HttpError(error.message, 500))
    }
}

const updateuser = async(req,res,next)=>{
    try {
        
        const user = req.user
        // console.log("user",user)

        const updates = Object.keys(req.body)

        const allowedfield = [
            "name",
            "password"
        ];

        const isValidUpdate = updates.every((field)=>{
            return allowedfield.includes(field)
        })

        if(!isValidUpdate){
            return next(new HttpError("only allowed field can be updated",400))
        }

        updates.forEach((update)=>{
            user[update] = req.body[update]
        })

        await user.save()

        res.status(200).json({success:true,message:"user update successfully",user})

    } catch (error) {
        next(new HttpError(error.message))
        
    }
}

export default { add, getalluser, login, authlogin, logOut, logoutAll, deleteuser,updateuser }