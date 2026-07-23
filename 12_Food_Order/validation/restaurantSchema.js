import joi from "joi";


const restaurantSchema = joi.object({
    restaurantName: joi.string().min(2).max(20).required().trim().messages({
        "string.base": "restaurantName must be string",
        "string.min": "minmum 2 characters required",
        "string.max": "maximum 20 characters allow",
        "string.empty": "restaurantName is required",
        "any.required": "restaurantName is required"
    }),
    description: joi.string().min(10).max(100).required().messages({
        "string.base": "description must be string",
        "string.min": "minimum 10 characters is required",
        "string.max": "maximum 100 characters allow",
        "string.empty": "description is required",
        "any.required": "description is required"
    }),
    state: joi.string().min(2).max(50).required().messages({
        "string.base": "statemust be string",
        "string.min": "minimum 2 character is required",
        "string.max": "maximum 50 character allow",
        "string.empty": "state is required",
        "any.required": "state is required"
    }),
    city: joi.string().min(2).max(50).required().messages({
        "string.base": "city must be string",
        "string.min": "minimum 2 character is required",
        "string.max": "maximum 50 character allow",
        "string.empty": "city is required",
        "any.required": "city is required"
    }),
    Address: joi.string().min(10).max(100).required().messages({
        "string.base": "Address must be string",
        "string.min": "minimum 10 character is required",
        "string.max": "maximum 100 character allow",
        "string.empty": "Address is required",
        "any.required": "Address is required"
    }),    
    
    openTime:joi.string().required().messages({
        "string.base":"openTime must be string",
        "string.empty":"opneTime is required",
        "any.required":"openTime is required"
    }),
    closeingTime:joi.string().required().messages({
        "string.base":"closeingTime must be string",
        "string.empty":"closeingTime is required",
        "any.required":"closeingTime is required"
    }),
    //  restaurant_img:joi.string().required().messages({
    //     "string.base":"restaurant_img must be string",
    //     "string.empty":"restaurant_img is required",
    //     "any.required":"restaurant_img is required"
    // }),

})

export default restaurantSchema