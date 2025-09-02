import { Types } from "mongoose";
import { Playlist } from "../models/playlist.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.models.js";

const createPlaylist = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new apiError(400, "Playlist body not found");
  }
  const { name, description } = req.body;

  if (!name) {
    throw new apiError(400, "Playlist name not found");
  }

  if (!description) {
    throw new apiError(400, "Playlist description not found");
  }

  const newPlaylist = await Playlist.create({
    name,
    description,
    owner: req.user._id,
  });

  if (!newPlaylist) {
    throw new apiError(500, "Error creating playlist");
  }

  return res
    .status(201)
    .json(new apiResponse(201, newPlaylist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new apiError(400, "User ID not found");
  }

  if (!Types.ObjectId.isValid(userId)) {
    throw new apiError(400, "Invalid User ID");
  }
  
  const userPlaylist = await Playlist.find({ owner: userId });

  if (userPlaylist.length === 0) {
    throw new apiError(404, "No playlists found for the logged in user");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        userPlaylist,
        "Playlist fetched successfully for the user"
      )
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!Types.ObjectId.isValid(playlistId)) {
    throw new apiError(400, "Invalid Playlist ID");
  }

  const playlistById = await Playlist.findById(playlistId);

  if (!playlistById) {
    throw new apiError(404, "Playlist not found for this ID");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        playlistById,
        "Playlist fetched successfully for this ID"
      )
    );
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!Types.ObjectId.isValid(playlistId) || !Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid Playlist ID or Video ID");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new apiError(404, "Playlist not found for this ID");
  }

  if (!playlist.owner.equals(req.user._id)) {
    throw new apiError(
      403,
      "You are not authorized to add video to this playlist as you are not the owner"
    );
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new apiError(404, "Video not found for this ID");
  }

  if (playlist.videos.includes(videoId)) {
    throw new apiError(400, "Video already exists in playlist");
  }

  playlist.videos.push(videoId);

  const updatedPlaylist = await playlist.save();

  if (!updatedPlaylist) {
    throw new apiError(500, "Error adding video to playlist");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        updatedPlaylist,
        "Video added successfully to playlist"
      )
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!Types.ObjectId.isValid(playlistId) || !Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid Playlist ID or Video ID");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new apiError(404, "Playlist not found for this ID");
  }

  if (!playlist.owner.equals(req.user._id)) {
    throw new apiError(
      403,
      "You are not authorized to remove video from this playlist as you are not the owner"
    );
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new apiError(404, "Video not found for this ID");
  }

  playlist.videos.pull(videoId);

  const updatedPlaylist = await playlist.save();

  if (!updatedPlaylist) {
    throw new apiError(500, "Error removing video from playlist");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        updatedPlaylist,
        "Video removed successfully from playlist"
      )
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!Types.ObjectId.isValid(playlistId)) {
    throw new apiError(400, "Invalid Playlist ID");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new apiError(404, "Playlist not found for this ID");
  }

  if (!playlist.owner.equals(req.user._id)) {
    throw new apiError(
      403,
      "You are not authorized to delete this playlist as you are not the owner"
    );
  }

  const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

  if (!deletedPlaylist) {
    throw new apiError(500, "Error deleting playlist");
  }
  return res
    .status(200)
    .json(
      new apiResponse(200, deletedPlaylist, "Playlist deleted successfully")
    );
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!Types.ObjectId.isValid(playlistId)) {
    throw new apiError(400, "Invalid Playlist ID");
  }

  if (!req.body) {
    throw new apiError(400, "Playlist body not found");
  }

  const { name, description } = req.body;

  if (!name) {
    throw new apiError(400, "Playlist name not found");
  }

  if (!description) {
    throw new apiError(400, "Playlist description not found");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new apiError(404, "Playlist not found for this ID");
  }

  if (!playlist.owner.equals(req.user._id)) {
    throw new apiError(
      403,
      "You are not authorized to update this playlist as you are not the owner"
    );
  }
  
  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    { name, description },
    { new: true }
  );

  if (!updatedPlaylist) {
    throw new apiError(500, "Error updating playlist");
  }
  return res
    .status(200)
    .json(
      new apiResponse(200, updatedPlaylist, "Playlist updated successfully")
    );
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
