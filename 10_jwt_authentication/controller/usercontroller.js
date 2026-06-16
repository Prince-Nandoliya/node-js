
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

const login = async(req,res,next)=>{
    try {


        const{email,password} = req.body

        const users = await user.findByCredentials(email,password)

        const token = await users.genrateAuthToken()

        if(!users){
            next(new HttpError("unable to login"))
        }

        res.status(200).json({success:true,users})
        
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


const authlogin = async(req,res,next)=>{
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
export default { add, getalluser,login,authlogin }