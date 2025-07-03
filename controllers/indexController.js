import { getConnection } from "../server.js";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";
import fs from "fs";
import session from "express-session";
import { userSignUpSchema } from "../joi/schema.js";
import { responseObject } from "../helpers/responseObject.js";

export const signUpPage = (req, res) => {
  res.render("sign-up");
};

// export const signUpHandler = async (req, res) => {
//   // console.log(req.body);
//   // console.log(req.file);
//   const filePath = req.file?.path;
//   // console.log("FilePath: ", filePath);

//   const { error, value } = userSignUpSchema.validate(req.body, {
//     abortEarly: false,
//   });
//   // console.log("JOI Error: ", error);
//   // console.log("JOI Value: ", value);

//   if (error) {
//     return res.status(400).json({
//       error: error.details,
//     });
//   } else {
//     // const newPath = `./public/uploads/${req.body.firstName}-${Date.now()}.${
//     //   req.file?.mimetype?.split("/")[1]
//     // } `;
//     // console.log("newPath: ", newPath);

//     // fs.renameSync(filePath, newPath);

//     const connection = await getConnection();
//     const { firstName, lastName, email, password } = req.body;

//     const saltRounds = 8;
//     const newPassword = async (password) => {
//       try {
//         const salt = await bcrypt.genSalt(saltRounds);
//         const hash = await bcrypt.hash(password, salt);
//         return hash;
//       } catch (error) {
//         console.log(error);
//         throw error;
//       }
//     };
//     const hashedPassword = await newPassword(password);

//     await connection.query(
//       `insert into user(first_name, last_name, email, password, profilePicture) values (?, ?, ?, ?, ?);`,
//       [firstName, lastName, email, hashedPassword, newPath]
//     );

//     console.log("Done Data Inserted!");

//     res.send("/login");
//     // await fetch("/login");
//   }
// };

export const signUpHandler = async (req, res) => {
  try {
    if (req.validationErrors) {
      console.log("Inside validation inside errors if: ", req.validationErrors);
      return res.status(400).json({
        status: "error",
        message: "Validation Error",
        errors: req.validationErrors,
      });
    }
    // else if (!req.file) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: "File Upload is Required!",
    //   });
    // }
    // else if (req.validationErrors) {
    //   console.log(
    //     "Validation Errors inside signUpHandler: ",
    //     req.validationErrors
    //   );
    // }
    console.log(req.body);
    console.log(req.file);

    // const filePath = req.file?.path;
    const filePath = req.filePath
    console.log("FilePath: ", filePath);

    console.log(req.validateBodyData);
    console.log(req.validateFileData);
    const { firstName, lastName, email, password } = req.validateBodyData;
    const connection = await getConnection();
    
    const [firstNameResult] = await connection.query(
      `select first_name from user where email = ?`,
      [email]
    );
    if (firstNameResult.length > 0) {
      return res.status(400).json(responseObject({ error: true }, "Email already sign-up!"))
    } else {
      const saltRounds = 8;
      const newPassword = async (password) => {
        try {
          const salt = await bcrypt.genSalt(saltRounds);
          const hash = await bcrypt.hash(password, salt);
          return hash;
        } catch (error) {
          console.log(error);
          throw error;
        }
      };
      const hashedPassword = await newPassword(password);

      await connection.query(
        `insert into user(first_name, last_name, email, password, profilePicture) values (?, ?, ?, ?, ?);`,
        [firstName, lastName, email, hashedPassword, filePath]
      );

      console.log("Done Data Inserted!");

      return res.status(200).json(responseObject({ success: true }, "SignUp Done Successfully!"));
    }
  } catch (error) {
    return res
      .status(400)
      .json(responseObject(error, "Error while User SignUP!"));
  }
};

export const loginPage = (req, res) => {
  res.render("login");
};

export const loginHandler = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;

    const connection = await getConnection();
    const [data] = await connection.query(
      `select first_name, last_name, password from user where email = ?;`,
      [email]
    );
    // console.log("data: ", data);

    if (data.length > 0) {
      const result = await bcrypt.compare(password, data[0].password);
      if (result) {
        const token = jsonWebToken.sign(
          {
            id: data[0].id,
            firstName: data[0].first_name,
            lastName: data[0].last_name,
            email: email,
          },
          "mysecret",
        );
        return res
          .status(200)
          .json(responseObject(token, "Login Successfully Done!"));
        // res.cookie("token", token, {
        //   httpOnly: true,
        //   secure: true,
        //   maxAge: 7200000,
        // });
      } else {
        throw "Wrong Crendentails!";
      }
    } else {
      throw "Wrong Crendentails!";
    }
  } catch (errorMsg) {
    return res.status(400).json(responseObject({ error: true }, errorMsg));
  }
};
