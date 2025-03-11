import express from "express"
import { applyJob, getApplicants, updateStatus } from "../controllers/application.controller.js"

const router = express.Router()

router.route('/apply/:id').post(applyJob)
router.route('/:id/applicants').get(getApplicants)
router.route('/status/:id/update').put(updateStatus)

export default router