import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
} from "../controllers/video.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

// Unprotected Routes
router.route("/").get(getAllVideos);
router.route("/:videoId").get(getVideoById);

// Protected Routes


router.route("/publish-video").post(verifyJwt, upload.single("video"), publishAVideo);

router.route("/:videoId").patch(verifyJwt, upload.single("video"), updateVideo);
router.route("/:videoId").delete(verifyJwt, deleteVideo);
router.route("/toggle-publish-status/:videoId").patch(verifyJwt, togglePublishStatus);

export default router;
