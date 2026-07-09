import joi from "joi"


const registerSchema = joi.object({
    Name:joi.string().min(2).max(15).required().trim().messages({
        "string.base":"Name must be string",
        "string.min":"minimum 2 characters required",
        "string.max":"maximum 15 characters allow",
        "string.empty":"Name is required",
        "any.required":"Name is required"
    }),
    Email:joi.string().email().required().messages({
        "string.base":"Email is required",
        "string.empty":"Email is required",
        "string.Email":"please enter a valid Email",
        "any.required":"Email is required"

    }),
    Password:joi.string().min(6).max(12).required().messages({
        "string.base":"Password must be string",
        "string.min":"minimum 2 character required",
        "string.max":"maximum 12 characters allow",
        "string.empty":"Password is reuired",
        "any.required":"Password are required"
    }),
    Role:joi.string().valid("customer","provider","admin").required().messages({
        "any.only":"Role must be customer,provider and admin",
        "string.empty":"Role is required",
        "string.required":"Role is required"
    }),
    Address:joi.string().min(6).max(100).required().messages({
        "string.base":"Address must be string",
        "string.min":"minimum 6 character required",
        "string.max":"maximum 100 character allow",
        "string.empty":"Address is required",
        "string.required":"Address is required"
    }),
    MoNumber:joi.string().pattern(/^(?:\+91|91)?[6-9]\d{9}$/).required().messages({
        "string.base":"MoNumber must be string",
        "string.empty":"MoNumber is required",
        "string.required":"MoNuber is required",
        "string.pattern.base":"Enter valid 10-digit MoNumber"
    }),        
})


export default registerSchema