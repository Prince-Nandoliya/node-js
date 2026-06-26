import user from "../model/usermodel.js"
import HttpError from "../middleware/HttpError.js"


const add = async (req, res, next) => {
    try {

        const { name, email, password } = req.body

        const newuser = new user({
            name,
            email,
            password
        })

        await newuser.save()

        res.status(201).json({ success: true, message: "new user add success fully", newuser })

    } catch (error) {
        next(new HttpError(error.message))
    }

}


const getall = async (req, res, next) => {
    try {

        const users = await user.find({})

        if (!users) {
            res.status(404).json({ success: false, message: "no user found" })
        }

        res.status(200).json({ success: true, total: users.length, message: "all user found successfully", users })

    } catch (error) {

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

        

        if (!user) {
            return next(new HttpError("unable to login"))
        }

        res.status(200).json({ success: true, user })

    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

const deleteuser = async (req, res, next) => {
    try {


        const user = req.user
      

        await user.deleteOne()

        res.status(200).json({ success: true, message: "user delete successfully" })
    } catch (error) {

        next(new HttpError(error.message, 500))
    }
}

const logOut = async (req, res, next) => {
    try {
        const token = req.token

        

        req.user.tokens = req.user.tokens.filter((t) => t.token != token)

        req.user.save()

        res.status(200).json({ success: true, message: "user logout successfully" })


    } catch (error) {
        next(new HttpError(error.message, 500))

    }
}


export default { add, getall, login,authlogin,deleteuser,logOut }