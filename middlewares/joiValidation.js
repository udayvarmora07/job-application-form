import Joi from "joi";
import { userSignUpSchema } from "../joi/schema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userFileSchema = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().alphanum().required(),
  mimetype: Joi.string()
    .pattern(new RegExp("^image/(png|jpg|jpeg)$"))
    .required()
    .messages({
      "string.pattern.base": "Image must be  of format png, jpg, jpeg.",
    }),
  // buffer: Joi.binary().required(),
  destination: Joi.string().required(),
  filename: Joi.string().required(),
  path: Joi.string().required(),
  size: Joi.number().min(1).max(1000000).required().messages({
    "number.max": "Maximum size of file is 1 mb.",
  }),
});

export const joiValidation = async (req, res, next) => {
  console.log("Inside Joi Validation: ", req.body);
  console.log("Inside Joi Validation: ", req.file);

  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "File Upload is Required!",
      });
    }
    const validateFileData = await userFileSchema.validateAsync(req.file, {
      abortEarly: false,
    });
    const validateBodyData = await userSignUpSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.validateBodyData = validateBodyData;
    req.validateFileData = validateFileData;

    const uploadDir = path.join(__dirname, "../public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    // console.log("uploadDir: ", uploadDir);

    const fileName = `${req.file.originalname.split(".")[0]}-${Date.now()}.${
      req.file.mimetype.split("/")[1]
    }`;
    const filePath = path.join(uploadDir, fileName);
    req.filePath = `./public/uploads/${fileName}`;
    // console.log(fileName);
    // console.log(filePath);

    const readStream = fs.createReadStream(req.file.path)
    const writeStream = fs.createWriteStream(filePath);
    // console.log("Req: ", req);

    // writeStream.on("open", () => {
    // req.pipe(writeStream);
    readStream.pipe(writeStream);
    // });

    // req.on("readable", () => {
    //   req.pipe(writeStream);
    // });
    // validateFileData.stream.pipe(writeStream);
    // console.log("zzzzzzzzzzzzzzzz");

    writeStream.on("finish", () => {
      console.log("bbbbbbbbbbbbbbbbbbbbbb");

      res.statusCode = 200;
      next();
      // res.writeHead(200, { "Content-Type": "application/json" });
      // res.send(
      //   JSON.stringify({
      //     message: "File Uploaded Successfully!",
      //     fileName: fileName,
      //     path: filePath,
      //   })
      // );
    });

    writeStream.on("error", (error) => {
      console.log("Error while writing file: ", error);
      res.statusCode = 500;
      res.writeHead(500, { "Content-Type": "application/json" });
      res.send(
        JSON.stringify({
          message: "Error while uploading file",
          error: error.message,
        })
      );
    });

    req.on("error", (error) => {
      console.log("Request Error: ", error);
      res.statusCode = 500;
      res.writeHead(500, { "Content-Type": "application/json" });
      res.send(
        JSON.stringify({
          message: "Request error",
          error: error.message,
        })
      );
    });

    // next();
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
