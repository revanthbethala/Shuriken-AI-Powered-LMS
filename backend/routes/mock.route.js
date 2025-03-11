import express from "express";
import { getUserMockTests, storeMockDetails, storeMockMarks } from "../controllers/mock.controller.js";

const router = express.Router();

router.post("/mock-tests", storeMockDetails);
router.put('/mock-marks/:testId',storeMockMarks);
router.get("/mock-tests/:userId", getUserMockTests);

export default router;
