import express from "express";
import { changeRole, getUser, getUserByClerk, getUserById } from "../controllers/user.controller.js";

const router= express.Router();

router.route('/getDetails').post(getUser)
router.route('/changeRole').put(changeRole)
router.route('/getUserById/:userId').get(getUserById)
router.route('/getUserByClerk/:userId').get(getUserByClerk)


export default router;