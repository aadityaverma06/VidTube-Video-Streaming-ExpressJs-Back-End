import { Types } from "mongoose";
import { Video } from "../models/video.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadOnCloudinaryVideo,
  deleteFromCloudinaryVideo,
  extractThumbnailFromVideo,
} from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query = " ",
    sortBy = "title",
    sortType = 1,
  } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const videoList = [
    {
      $match: {
        title: {
          $regex: `^${query}`,
          $options: "i",
        },
      },
    },
    {
      $sort: {
        [sortBy]: sortType,
      },
    },
  ];

  const aggregateVideoList = Video.aggregate(videoList);

  const paginatedVideoList = await Video.aggregatePaginate(
    aggregateVideoList,
    options
  );

  if (paginatedVideoList.docs.length === 0) {
    throw new apiError(404, "No videos found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, paginatedVideoList, "Videos fetched successfully")
    );
});

const publishAVideo = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new apiError(400, "Video body not found");
  }

  const { title, description } = req.body;

  if (!title) {
    throw new apiError(400, "Video title not found");
  }

  if (!description) {
    throw new apiError(400, "Video description not found");
  }

  const videoFilePath = req.file?.path;

  if (!videoFilePath) {
    throw new apiError(400, "Video file is required");
  }

  const videoUpload = await uploadOnCloudinaryVideo(videoFilePath);

  if (!videoUpload) {
    throw new apiError(500, "Error uploading video");
  }

  const videoThumbnailUrl = extractThumbnailFromVideo(videoUpload.public_id);

  if (!videoThumbnailUrl) {
    throw new apiError(500, "Error extracting thumbnail");
  }

  try {
    const createVideo = await Video.create({
      videoFile: videoUpload.url,
      thumbnail: videoThumbnailUrl,
      title,
      description,
      duration: videoUpload.duration,
      owner: req.user._id,
    });

    if (!createVideo) {
      throw new apiError(500, "Error creating video");
    }

    return res
      .status(201)
      .json(new apiResponse(201, createVideo, "Video created successfully"));
  } catch (error) {
    if (videoUpload) {
      await deleteFromCloudinaryVideo(videoUpload.public_id);
    }
    console.log(error);
    throw new apiError(500, "Error creating video");
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Video ID is not an ObjectId");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new apiError(404, "Video not found");
  }

  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);
    if (!user.watchHistory.includes(videoId))
      if (!user) {
        throw new apiError(404, "User not found");
      }

    user.watchHistory.push(videoId);
    await user.save();
  }

  video.views += 1;

  const updatedVideo = await video.save();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        updatedVideo,
        "Video fetched successfully and viewcount updated"
      )
    );
});

const updateVideo = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new apiError(400, "Video body not found");
  }
  const { videoId } = req.params;

  if (!Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Video ID is not an ObjectId");
  }

  const { title, description } = req.body;

  if (!title) {
    throw new apiError(400, "Video title not found");
  }

  if (!description) {
    throw new apiError(400, "Video description not found");
  }

  const videoFilePath = req.file?.path;

  const oldVideo = await Video.findById(videoId);
  console.log(oldVideo.owner, req.user._id);

  if (oldVideo.owner.toString() != req.user._id.toString()) {
    throw new apiError(
      403,
      "You are not authorized to update this video as you are not the owner"
    );
  }

  if (!oldVideo) {
    throw new apiError(404, "Video not found");
  }

  let video;

  if (!videoFilePath) {
    video = await Video.findByIdAndUpdate(
      videoId,
      {
        title,
        description,
      },
      { new: true }
    );

    if (!video) {
      throw new apiError(500, "Error updating video");
    }

    return res
      .status(200)
      .json(new apiResponse(200, video, "Video details updated successfully"));
  } else {
    const updatedVideo = await uploadOnCloudinaryVideo(videoFilePath);

    if (!updatedVideo) {
      throw new apiError(500, "Error uploading updated Video");
    }

    const thumbnailUrl = extractThumbnailFromVideo(updatedVideo.public_id);

    if (!thumbnailUrl) {
      throw new apiError(500, "Error extracting thumbnail");
    }

    try {
      video = await Video.findByIdAndUpdate(
        videoId,
        {
          videoFile: updatedVideo.url,
          thumbnail: thumbnailUrl,
          title,
          description,
          views: 0,
          duration: updatedVideo.duration,
        },
        { new: true }
      );

      if (!video) {
        throw new apiError(500, "Error updating video");
      }

      await deleteFromCloudinaryVideo(
        oldVideo.videoFile.split("/").pop().split(".")[0]
      );

      return res
        .status(200)
        .json(
          new apiResponse(
            200,
            video,
            "Video details with file updated successfully"
          )
        );
    } catch (error) {
      if (updatedVideo) {
        await deleteFromCloudinaryVideo(updatedVideo.public_id);
      }
      console.log(error);
      throw new apiError(500, "Error creating video");
    }
  }
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Video ID is not an ObjectId");
  }

  const video = await Video.findById(videoId);
  if (video.owner.toString() != req.user._id.toString()) {
    throw new apiError(
      403,
      "You are not authorized to delete this video as you are not the owner"
    );
  }

  if (!video) {
    throw new apiError(404, "Video not found");
  }

  const deleteVideo = await Video.findByIdAndDelete(videoId);

  if (!deleteVideo) {
    throw new apiError(500, "Error deleting video");
  }

  await deleteFromCloudinaryVideo(
    video.videoFile.split("/").pop().split(".")[0]
  );

  return res
    .status(200)
    .json(new apiResponse(200, deleteVideo, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Video ID is not an ObjectId");
  }

  const video = await Video.findById(videoId);
  if (video.owner.toString() != req.user._id.toString()) {
    throw new apiError(
      403,
      "You are not authorized to toggle this video publish status as you are not the owner"
    );
  }

  if (!video) {
    throw new apiError(404, "Video not found");
  }

  video.isPublished = !video.isPublished;

  const toggledVideoPublishStatus = await video.save();

  if (!toggledVideoPublishStatus) {
    throw new apiError(500, "Error toggling video publish status");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        toggledVideoPublishStatus,
        "Video publish status toggled successfully"
      )
    );
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
