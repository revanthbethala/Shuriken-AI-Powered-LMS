import express from "express"
import { getCompaniesByUserId, getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js"
import upload from "../middlewares/multer.js";


const router = express.Router()

router.route('/register').post(registerCompany)
router.route('/get').post(getCompany)
router.route('/getAll/:id').get(getCompaniesByUserId)
router.route('/get/:id').get(getCompanyById)
router.route('/update/:id').put(upload.single("logo"),updateCompany)

export default router