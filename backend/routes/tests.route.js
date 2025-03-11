import express from "express";
import { getUserTests, storetestDetails, storeMarks } from "../controllers/tests.controller.js";

const router = express.Router();

router.route('/store').post(storetestDetails)
router.route('/getAllTests/:userId').get(getUserTests);
router.route('/storeMarks/:testId').put(storeMarks);

export default router;
