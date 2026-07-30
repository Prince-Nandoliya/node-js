import Joi from "joi";

export const registerSchema = Joi.object({
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
    Role: Joi.string().valid("user","admin").default("user"),
    Address: Joi.string().min(5).max(100).required().messages({
    "string.base": "Address must be in string format",
    "string.min": "Address must be at least 5 character long",
    "string.max": "Address must be 100 character long",
    "any.required": "Address ir required",
  }),
  Phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.base": "Phone must be in string format",
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian mobile number",
      "any.required": "Phone is required",
    }),
   
})

export const  updateUserSchema = registerSchema 
     .fork(["Name","Address","Phone","Password"],(fields) => fields.optional())
     .fork(["Role","Email"],(fields)=> fields.forbidden())
     .or("Name","Address","Phone")
     .messages({        
    "object.missing":
      "Name, Address, Phone and Password  any one required to update ",
     })