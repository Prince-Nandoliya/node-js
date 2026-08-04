import HttpError from "./HttpError.js"

const checkRole = (...Roles) => (req,res,next)=>{
    try {
        
        if(!req.Employee){
            return next(new HttpError("please authenticate",400))
        }

        if(!Roles.includes(req.Employee.Role)){
            return next(new HttpError("forbidden access denied",403))
        }
        next()

    } catch (error) {
        next(new HttpError(error.message))
    }
}

export default checkRole