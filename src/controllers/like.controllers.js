import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.models.js";
import { Video } from "../models/video.models.js";
import { Comment } from "../models/comment.models.js";
import { Tweet } from "../models/tweet.models.js";
import { Types } from "mongoose";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Video Id is not an ObjectId");
  }

  const isVideoExisting = await Video.findOne({
    _id: videoId,
  });

  if (!isVideoExisting) {
    throw new apiError(404, "Video not found");
  }

  const isLiked = await Like.findOne({ video: videoId, likedBy: req.user._id });

  if (isLiked) {
    const deletedLike = await Like.findByIdAndDelete(isLiked._id);

    if (!deletedLike) {
      throw new apiError(500, "Like not deleted");
    }

    return res
      .status(200)
      .json(new apiResponse(200, deletedLike, "Unliked Video"));
  } else {
    const likedVideo = await Like.create({
      video: videoId,
      likedBy: req.user._id,
    });

    if (!likedVideo) {
      throw new apiError(500, "Like not created");
    }

    return res
      .status(201)
      .json(new apiResponse(201, likedVideo, "Liked Video"));
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!Types.ObjectId.isValid(commentId)) {
    throw new apiError(400, "Comment Id is not an ObjectId");
  }

  const isCommentExisting = await Comment.findOne({
    _id: commentId,
  });

  if (!isCommentExisting) {
    throw new apiError(404, "Comment not found");
  }

  const isLiked = await Like.findOne({
    comment: commentId,
    likedBy: req.user._id,
  });

  if (isLiked) {
    const deletedLike = await Like.findByIdAndDelete(isLiked._id);

    if (!deletedLike) {
      throw new apiError(500, "Like not deleted");
    }

    return res
      .status(200)
      .json(new apiResponse(200, deletedLike, "Unliked Comment"));
  } else {
    const likedComment = await Like.create({
      comment: commentId,
      likedBy: req.user._id,
    });

    if (!likedComment) {
      throw new apiError(500, "Like not created");
    }

    return res
      .status(201)
      .json(new apiResponse(201, likedComment, "Liked Comment"));
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!Types.ObjectId.isValid(tweetId)) {
    throw new apiError(400, "Tweet Id is not an ObjectId");
  }

  const isTweetExisting = await Tweet.findOne({
    _id: tweetId,
  });

  if (!isTweetExisting) {
    throw new apiError(404, "Tweet not found");
  }

  const isLiked = await Like.findOne({
    tweet: tweetId,
    likedBy: req.user._id,
  });

  if (isLiked) {
    const deletedLike = await Like.findByIdAndDelete(isLiked._id);

    if (!deletedLike) {
      throw new apiError(500, "Like not deleted");
    }

    return res
      .status(200)
      .json(new apiResponse(200, deletedLike, "Unliked Tweet"));
  } else {
    const likedTweet = await Like.create({
      tweet: tweetId,
      likedBy: req.user._id,
    });

    if (!likedTweet) {
      throw new apiError(500, "Like not created");
    }

    return res
      .status(201)
      .json(new apiResponse(201, likedTweet, "Liked Tweet"));
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  const LikedVideos = Like.aggregate([
    {
      $match: {
        video: {
          $exists: true,
        },
        likedBy: req.user._id,
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
      },
    },
    {
      $unwind: "$video",
    },
  ]);

  const paginatedLikedVideos = await Like.aggregatePaginate(
    LikedVideos,
    options
  );

  if (!paginatedLikedVideos.docs.length) {
    throw new apiError(500, "Liked Videos not found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, paginatedLikedVideos, "All Liked Video fetched")
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
