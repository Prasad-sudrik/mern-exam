import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import { createSubmission } from "../controllers/submission.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createSubmission);
export default router;
