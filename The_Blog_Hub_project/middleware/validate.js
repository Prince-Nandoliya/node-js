import HttpError from "./HttpError.js";

const validate = (Schema) => (req,res,next)=>{
    try {
        
        const {error,value} = Schema.validate(req.body,{
            abortEarly:true,
            allowUnknow:false
        })


        if(error){
            return next(new HttpError(error.details[0].message))
        }

        next()

        return value;


    } catch (error) {
        throw new Error(error.message)
    }
}

export default validate