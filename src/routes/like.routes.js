import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getLikedVideos,
} from "../controllers/like.controllers.js";

const router = Router();

// Protected Routes

router.route("/video/:videoId").post(verifyJwt, toggleVideoLike);
router.route("/comment/:commentId").post(verifyJwt, toggleCommentLike);
router.route("/tweet/:tweetId").post(verifyJwt, toggleTweetLike);
router.route("/liked-videos").get(verifyJwt, getLikedVideos);

export default router;
