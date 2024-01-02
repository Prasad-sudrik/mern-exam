import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import { createTest, getTest } from "../controllers/test.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createTest);
router.get("/get/:id", verifyToken, getTest);
export default router;
