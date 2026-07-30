import Joi from "joi";

 export const BlogSchema = Joi.object({

    BlogTitle: Joi.string().min(3).max(30).trim().required().messages({
        "string.base": "BlogTitle must be in string",
        "string.min": "minimum 3 character is required",
        "stirng.max": "maximum 30 character is allow",
        "any.required": "BlogTitle is required"
    }),
    Category: Joi.string().valid("Business", "Travel", "Travel").required().messages({
        "string.base": "Category must be in string",
        "any.only": "Category must be Business, Travel or Lifestyle",
        "any.required": "Category is required"
    }),
    content: Joi.string().min(10).required().messages({
            "string.base": "Content must be a string",
            "string.empty": "Content is required",
            "string.min": "Content must be at least 10 characters",
            "any.required": "Content is required"
        }),

    description: Joi.string().min(10).max(500).required().messages({
            "string.base": "Description must be a string",
            "string.empty": "Description is required",
            "string.min": "Description must be at least 10 characters",
            "string.max": "Description cannot exceed 500 characters",
            "any.required": "Description is required"
        }),


})


export const updateBlogSchema = BlogSchema
       .fork(["BlogTitle","Category","content","description"],(fields) => fields.optional())
       .or("BlogTitle","Category","content","description")
       .messages({
          "object.missing":
      "BlogTitle,Category,Content or description any one field is required to update",
       })