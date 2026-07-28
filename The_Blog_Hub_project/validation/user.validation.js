import Joi from "joi";

const registerSchema = Joi.object({
    Name: Joi.string().min(2).max(25).trim().required().messages({
        "string.base":"Name must be in string format",
        "string.min":"minimum 2 character is required",
        "string.max":"maximum 25 character allow",
        "any.required":"Name is required"
    }),
    Email: Joi.string().email().required().messages({
        "string.base":"Email must be in string",
        "any.required":"Email is required"
    }),
    Password: Joi.string().min(6).max(20).required().messages({
        "string.base":"Password must be in string",
        "any.required":"Password is required"
    }),
    Role: Joi.string().valid("user","admin").default("user")
    
})

export default registerSchema