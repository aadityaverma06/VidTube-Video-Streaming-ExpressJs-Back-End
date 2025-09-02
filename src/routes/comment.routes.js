import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controllers.js";

const router = Router();


// Unprotected Routes

router.route("/:videoId").get(getVideoComments);

// Protected Routes

router.route("/:videoId").post(verifyJwt, addComment);
router.route("/:commentId").patch(verifyJwt, updateComment);
router.route("/:commentId").delete(verifyJwt, deleteComment);

export default router;