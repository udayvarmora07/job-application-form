import express from "express";
import {
  loginHandler,
  loginPage,
  signUpHandler,
  signUpPage,
} from "../controllers/indexController.js";
import { auth } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import { validation } from "../middlewares/validation.js";
import {
  userFileSchema,
  userLoginSchema,
  userSignUpSchema,
} from "../joi/schema.js";
import { fileUpload } from "../middlewares/fileUpload.js";
import { joiValidation } from "../middlewares/joiValidation.js";
const router = express.Router();

router.get("/", signUpPage);
// router.post(
//   "/sign-up",
//   fileUpload(userFileSchema, userSignUpSchema),
//   signUpHandler
// );
router.post("/sign-up", upload.single("profilePicture"), joiValidation, signUpHandler);
// router.post(
//   "/sign-up",
//   upload(userFileSchema).single("profilePicture"),
//   validation(userSignUpSchema),
//   signUpHandler  
// );
// router.post("/sign-up", upload.none(), signUpHandler);
router.get("/login", loginPage);
router.post("/login", validation(userLoginSchema), loginHandler);

export { router };
