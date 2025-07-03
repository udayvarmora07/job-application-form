// export const validation = (schema1, schema2) => {
//   return async (req, res, next) => {
//     try {
//         console.log("---------body", req.body);
//       console.log("---------file", req.file);
//       console.log("---------fileData", req.fileData);
//       if(!req.file) {
//         return new Error("Select File...")
//       }
//       const validateBodyData = await schema1.validateAsync(req.body, {
//         abortEarly: false,
//       });
//       const validateFileData = await schema2.validateAsync(req.file, {
//         abortEarly: false,
//       });
//       console.log("ValidateBodyData: ", validateBodyData);
//       console.log("ValidateFileData: ", validateFileData);
//       req.validateBodyData = validateBodyData;
//       req.validateFileData = validateFileData;
//       next();
//     } catch (error) {
//         console.log("Error in Validation Middleware: ", error.details);

//       const errors = error.details.map((error) => ({
//         // field: error.path.join("."),
//         field: error.path.toString(),
//         message: error.message,
//       }));
//       //   console.log(errors);
//       return res.status(400).json({
//         status: "error",
//         message: "Validation Error",
//         errors,
//       });
//     }
//   };
// };

export const validation = (schema) => {
  return async (req, res, next) => {
    try {
      if (req.validationErrors) {
        console.log(
          "Inside validation inside errors if: ",
          req.validationErrors
        );
        return res.status(400).json({
          status: "error",
          message: "Validation Error",
          errors: req.validationErrors,
        });
      }
      // if(!req.file) {
      //   return res.status(400).json({
      //     status: "error",
      //     message: "File Upload is Required!",
      //   })
      // }
      console.log("---------body", req.body);
      console.log("---------file", req.file);
      console.log("---------fileData", req.fileData);
      const validateBodyData = await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      console.log("ValidateBodyData: ", validateBodyData);
      console.log("ValidateFileData: ", req.validateFileData);
      req.validateBodyData = validateBodyData;
      next();
    } catch (error) {
      console.log("Error in Validation Middleware: ", error);

      const errors = error.details.map((error) => ({
        // field: error.path.join("."),
        field: error.path.toString(),
        message: error.message,
      }));
      //   console.log(errors);
      return res.status(400).json({
        status: "error",
        message: "Validation Error",
        errors,
      });
    }
  };
};
