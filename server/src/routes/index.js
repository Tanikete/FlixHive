import express from "express";
import UserRoute from "./user.route.js";
import ReviewRoute from "./review.route.js";
import personRoute from "./person.route.js";
import mediaRoute from "./media.route.js";


const router = express.Router();

router.use("/user", UserRoute);
router.use("/reviews", ReviewRoute);
router.use("/person", personRoute);
router.use("/mediaType", mediaRoute);

export default router;