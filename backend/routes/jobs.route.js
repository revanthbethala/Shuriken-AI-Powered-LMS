import express from "express"
import { getAdminJobs, getJobById, postJob, getAllJobs } from "../controllers/jobs.controller.js"

const router = express.Router()

router.route('/post').post(postJob)
router.route('/get').get(getAllJobs)
router.route('/getAdminJobs/:adminId').get(getAdminJobs)
router.route('/get/:id').get(getJobById)

export default router