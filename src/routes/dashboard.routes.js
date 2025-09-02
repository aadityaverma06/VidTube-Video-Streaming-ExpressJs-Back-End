import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import {
  getChannelStats,
  getChannelVideos,
} from "../controllers/dashboard.controllers.js";

const router = Router();

// Protected Routes

router.route("/channel-stats").get(verifyJwt, getChannelStats);
router.route("/channel-videos").get(verifyJwt, getChannelVideos);
export default router;
