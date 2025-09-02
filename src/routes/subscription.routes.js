import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
} from "../controllers/subscriptions.controllers.js";

const router = Router();

// Unprotected Routes

router
  .route("/subscribers/:channelId")
  .get(getUserChannelSubscribers);

// Protected Routes

router.route("/:channelId").post(verifyJwt, toggleSubscription);

router
  .route("/subscribed-channels/:subscriberId")
  .get(verifyJwt, getSubscribedChannels);

export default router;
