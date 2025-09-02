import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "../controllers/playlist.controllers.js";

const router = Router();

// Unprotected Routes

router.route("/user-playlists/:userId").get(getUserPlaylists);
router.route("/playlist/:playlistId").get(getPlaylistById);

// Protected Routes

router.route("/playlist/create-playlist").post(verifyJwt, createPlaylist);

router
  .route("/playlist/:playlistId/video/:videoId")
  .post(verifyJwt, addVideoToPlaylist);
router
  .route("/playlist/:playlistId/video/:videoId")
  .delete(verifyJwt, removeVideoFromPlaylist);
router.route("/playlist/:playlistId").delete(verifyJwt, deletePlaylist);
router.route("/playlist/:playlistId").patch(verifyJwt, updatePlaylist);

export default router;
