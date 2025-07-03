import express from "express"
import { listPage, getlistData, getCreatePage, createApplicant, viewPage, viewData } from "../controllers/applicantController.js";
import { auth } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
const router = express.Router();

router.get("/list", listPage)
router.get("/listdata", auth, getlistData)
router.get("/createPage", getCreatePage)
router.post("/create", auth, createApplicant);
router.get("/view", viewPage)
router.get("/viewData/:id", auth, viewData)

export { router }