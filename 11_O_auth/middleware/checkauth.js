import HttpError from "./HttpError.js";

const checkauth = async(req,res,next)=>{
    try {
        
        if(!req.user){
            res.render("login")
        }

        next()

    } catch (error) {
        next(new HttpError(error.message))
    }
}

export default checkauth