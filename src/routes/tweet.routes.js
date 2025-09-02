import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import {
  createTweet,
  getUserTweets,
  updateTweet,
  deleteTweet,
} from "../controllers/tweet.controllers.js";

const router = Router();

// Unprotected Routes

router.route("/:userId").get(getUserTweets);

// Protected Routes

router.route("/").post(verifyJwt, createTweet);
router.route("/:tweetId").patch(verifyJwt, updateTweet);
router.route("/:tweetId").delete(verifyJwt, deleteTweet);

export default router;
