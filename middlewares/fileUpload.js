// import multer from "multer";

// const fileUpload = (fileSchema) => {
//   return (req, res, next) => {
//     const storage = multer.diskStorage({
//       destination: (req, file, cb) => {
//         console.log("body inside destination: ", req.body);
//         console.log("file inside destination: ", file);
//         cb(null, "./public/uploads/");
//       },
//       filename: (req, file, cb) => {
//         cb(
//           null,
//           `${file.originalname.split(".")[0]}-${Date.now()}.${
//             file.mimetype.split("/")[1]
//           }`
//         );
//       },
//     });

//     // const fileFilter = (fileSchema) => {
//     //   return async (req, file, cb) => {
//     //     console.log("file inside fileFilter: ", req.file);
//     //     console.log("file inside fileFilter: ", file);
//     //     // console.log("Req Hearders inside fileFilter", req.headers);

//     //     try {
//     //       const validateFileData = await fileSchema.validateAsync(file, {
//     //         abortEarly: false,
//     //       });
//     //       req.validateFileData = validateFileData;
//     //       cb(null, true);
//     //     } catch (error) {
//     //       console.log("Error inside fileFilter: ", error.details);

//     //       const errors = error.details.map((error) => ({
//     //         // field: error.path.join("."),
//     //         field: error.path.toString(),
//     //         message: error.message,
//     //       }));
//     //       // console.log("Errors: ", errors);

//     //       // return cb(null, false, errors);
//     //       // const newError = new Error("File Validation Error!")
//     //       // newError.details = errors;
//     //       req.validationErrors = errors;
//     //       return cb(null, false, req.validationErrors);
//     //     }
//     //   };
//     // };

//     const upload = (fileSchema) => {
//       return multer({
//         storage: storage,
//         limits: {
//           fileSize: 1000000,
//           files: 1,
//         },
//         fileFilter: (fileSchema) => {
//           return async (req, file, cb) => {
//             console.log("file inside fileFilter: ", req.file);
//             console.log("file inside fileFilter: ", file);
//             // console.log("Req Hearders inside fileFilter", req.headers);

//             try {
//               const validateFileData = await fileSchema.validateAsync(file, {
//                 abortEarly: false,
//               });
//               req.validateFileData = validateFileData;
//               cb(null, true);
//             } catch (error) {
//               console.log("Error inside fileFilter: ", error.details);

//               const errors = error.details.map((error) => ({
//                 // field: error.path.join("."),
//                 field: error.path.toString(),
//                 message: error.message,
//               }));
//               // console.log("Errors: ", errors);

//               // return cb(null, false, errors);
//               // const newError = new Error("File Validation Error!")
//               // newError.details = errors;
//               req.validationErrors = errors;
//               return cb(null, false, req.validationErrors);
//             }
//           };
//         },
//       }).single("profilePicture");
//     };
//   };
// };
// fileUpload(req, res, (err) => {
//   if (err) {
//     console.log("--");

//     console.log(err);
//   } else {
//     next();
//   }
// });
// export { fileUpload };

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("body inside destination: ", req.body);
    console.log("file inside destination: ", file);
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.originalname.split(".")[0]}-${Date.now()}.${
        file.mimetype.split("/")[1]
      }`
    );
  },
});

const fileFilter = (fileSchema1, fileSchema2) => async (req, file, cb) => {
  console.log("file inside fileFilter: ", req.body);
  try {
    const validateFileData = await fileSchema1.validateAsync(file, {
      abortEarly: false,
    });
    const validateBodyData = await fileSchema2.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log("validateFileData inside fileFilter: ", validateFileData);
    console.log("validateBodyData inside fileFilter: ", validateBodyData);

    req.validateFileData = validateFileData;
    req.validateBodyData = validateBodyData;
    cb(null, true);
  } catch (error) {
    console.log("Error inside fileFilter: ", error.details);
    const errors = error.details.map((err) => ({
      field: err.path.toString(),
      message: err.message,
    }));
    req.validationErrors = errors;
    cb(new Error("File validation failed"), false);
  }
};

const fileUpload = (fileSchema1, fileSchema2) => {
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1000000,
      files: 1,
    },
    fileFilter: fileFilter(fileSchema1, fileSchema2),
  }).single("profilePicture");

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          console.log("Upload error:", err);
          return res.status(400).json({
            message: err.message,
            field: err.field,
            details: req.validationErrors,
          });
        }
      }
      next();
    });
  };
};

export { fileUpload };
