import express from "express";
import { getCities, getStates } from "../controllers/apiController.js";
export const router = express.Router();

router.get("/city", getCities);
router.get("/state", getStates);