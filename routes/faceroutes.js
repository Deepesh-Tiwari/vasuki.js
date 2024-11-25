import express from "express";
import { analyzeImage } from "../controllers/facecontroller.js";

const router = express.Router();

// Route for image analysis
router.post("/analyze", analyzeImage);

export default router;
