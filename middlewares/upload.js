import multer from "multer";

const storage = multer.diskStorage({})
const upload = multer({ storage: storage });
// const upload = multer();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log("body inside destination: ", req.body);
//     console.log("file inside destination: ", req.file);
//     cb(null, "./public/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.originalname.split(".")[0]}-${Date.now()}.${file.mimetype.split("/")[1]}`);
//   },
// });

// const upload = multer({ storage: storage, limits: {
//   fileSize: 1000000,
//   files: 1,
// } });

export { upload }



// import multer from "multer";
// import { userFileSchema, userSignUpSchema } from "../joi/schema.js";
// import { validation } from "./validation.js";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log("body inside destination: ", req.body);
//     console.log("file inside destination: ", file);
//     cb(null, "./public/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `${file.originalname.split(".")[0]}-${Date.now()}.${
//         file.mimetype.split("/")[1]
//       }`
//     );
//   },
// });

// const fileFilter = (fileSchema) => {
//   return async (req, file, cb) => {
//     console.log("file inside fileFilter: ", req.file);
//     console.log("file inside fileFilter: ", file);
//     // console.log("Req Hearders inside fileFilter", req.headers);

//     try {
//       const validateFileData = await fileSchema.validateAsync(file, {
//         abortEarly: false,
//       });
//       req.validateFileData = validateFileData;
//       cb(null, true);
//     } catch (error) {
//       console.log("Error inside fileFilter: ", error.details);

//       const errors = error.details.map((error) => ({
//         // field: error.path.join("."),
//         field: error.path.toString(),
//         message: error.message,
//       }));
//       // console.log("Errors: ", errors);

//       // return cb(null, false, errors);
//       // const newError = new Error("File Validation Error!")
//       // newError.details = errors;
//       req.validationErrors = errors;
//       return cb(null, false, req.validationErrors);
//     }
//   };
// };

// const upload = (fileSchema) => {
//   return multer({
//     storage: storage,
//     limits: {
//       fileSize: 1000000,
//       files: 1,
//     },
//     fileFilter: fileFilter(fileSchema),
//   });
// };

// export { upload };