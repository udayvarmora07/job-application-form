import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import mysql from "mysql2/promise";
import cookieParser from "cookie-parser";
import "dotenv/config";
import session from "express-session";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 360000,
      secure: false,
    },
  })
);

export async function getConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "UdayVarmora@2703",
    database: "Dynamic_Control_Job",
  });
}

const connection = getConnection();
if (connection) {
  console.log("Database Connected Successfully!");
} else {
  console.log("Error while connecting database!");
}

import { router as IndexRoute } from "./routes/index.js";
import { router as applicantRoute } from "./routes/applicantRoute.js";
import { router as apiRoutes } from "./routes/apiRoutes.js";

app.use("/", IndexRoute);
app.use("/applicants", applicantRoute);
app.use("/api", apiRoutes);
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `can't find ${req.originalUrl} on the server.`,
  });
});

app.listen(PORT, () => {
  console.log(`Server Started on PORT: ${PORT}`);
});
