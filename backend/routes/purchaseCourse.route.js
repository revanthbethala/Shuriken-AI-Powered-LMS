import express from "express";

import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, shuriPayment, stripeWebhook } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/checkout/create-checkout-session").post( createCheckoutSession);
router.route("/webhook").post(express.raw({type:"application/json"}), stripeWebhook);
router.route("/course/:courseId/detail-with-status").get(getCourseDetailWithPurchaseStatus);
router.route("/shuriPay").post(shuriPayment)
router.route("/").get(getAllPurchasedCourse);

export default router;