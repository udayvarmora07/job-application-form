import Joi from "joi";

export const userSignUpSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "any.required": "First Name is Required!",
    "string.empty": "First Name cannot be empty string!",
  }),
  lastName: Joi.string().trim().required().messages({
    "any.required": "Last Name is Required!",
    "string.empty": "Last Name cannot be empty string!",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is Required!",
    "string.empty": "Email cannot be empty string!",
    "string.email": "Invalid email format",
  }),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$")
    )
    .required()
    .messages({
      "any.required": "Password is Required!",
      "string.empty": "Password cannot be empty string!",
      "string.pattern.base":
        "Password must contain only letters, numbers, and splecial characters like '@', '$', '#', '!' and be between 6 and 30 characters long!",
    }),
});

// export const userFileSchema = Joi.object({
//   fieldname: Joi.string().required(),
//   originalname: Joi.string().required(),
//   encoding: Joi.string().alphanum().required(),
//   mimetype: Joi.string()
//     .valid(new RegExp("^image/(png|jpg|jpeg)$"))
//     .required()
//     .messages({
//       "any.only": "Image must be  of format png, jpg, jpeg.",
//     }),
//   destination: Joi.string().required(),
//   filename: Joi.string().required(),
//   path: Joi.string().required(),
//   size: Joi.number().min(1).max(1024000).required().messages({
//     "number.max": "Maximum size of file is 1 mb.",
//   }),
// });

export const userFileSchema = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().alphanum().required(),
  mimetype: Joi.string()
    .pattern(new RegExp("^image/(png|jpg|jpeg)$"))
    .required()
    .messages({
      "string.pattern.base": "Image must be  of format png, jpg, jpeg.",
    }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is Required!",
    "string.empty": "Email cannot be empty string!",
    "string.email": "Invalid email format",
  }),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$")
    )
    .required()
    .messages({
      "any.required": "Password is Required!",
      "string.empty": "Password cannot be empty string!",
      "string.pattern.base":
        "Password must contain only letters, numbers, and splecial characters like '@', '$', '#', '!' and be between 6 and 30 characters long!",
    }),
});
