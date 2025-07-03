import jwt from "jsonwebtoken";

// export const auth = (req, res, next) => {
//     // console.log("Token Cookie Value: ", req.cookies["token"]);
//     // console.log("Inside authMiddleware!");
//     // console.log("Token using Session: ", req.session.token_t);
//     const token = req.cookies["token"];
//     // const token = req.session.token_t;
//     if(token) {
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         // console.log("decoded: ", decoded);
//         if(decoded) {
//             req.user = decoded;
//             next();
//         }
//     } else {
//         res.redirect("/login")
//     }
// }

export const auth = (req, res, next) => {
  // console.log(typeof req.headers.authorization);
  
  const token = req?.headers?.authorization?.split(" ")[1];
  
  if (token) {
    const decoded = jwt.verify(token, "mysecret");
    // console.log("decoded: ", decoded);
    if (decoded) {
      req.user = decoded;
      next();
    }
  } else {
    res.redirect("/login");
  }
};
