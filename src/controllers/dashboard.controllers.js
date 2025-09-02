import { Types } from "mongoose";
import { Video } from "../models/video.models.js";
import { Subscription } from "../models/subscription.models.js";
import { Like } from "../models/like.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new apiError(400, "User ID not found");
  }

  if (!Types.ObjectId.isValid(userId)) {
    throw new apiError(400, "Invalid User ID");
  }

  let videoCount = await Video.countDocuments({ owner: userId });

  if (!videoCount) {
    videoCount = 0;
  }

  let subscriberCount = await Subscription.countDocuments({
    channel: userId,
  });

  if (!subscriberCount) {
    subscriberCount = 0;
  }

  let videoViewsCount = await Video.aggregate([
    {
      $match: {
        owner: userId,
      },
    },
    {
      $group: {
        _id: null,
        totalViews: { $sum: "$views" },
      },
    },
  ]);

  let commentLikesCount = await Like.aggregate([
    {
      $match: {
        comment: {
          $exists: true,
        },
      },
    },
    {
      $group: {
        _id: "$comment",
        likeCountForEachComment: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "_id",
        as: "comments",
      },
    },
    {
      $unwind: "$comments",
    },
    {
      $match: {
        "comments.owner": userId,
      },
    },
    {
      $group: {
        _id: null,
        totalLikes: { $sum: "$likeCountForEachComment" },
      },
    },
  ]);

  let videoLikesCount = await Like.aggregate([
    {
      $match: {
        video: {
          $exists: true,
        },
      },
    },
    {
      $group: {
        _id: "$video",
        likeCountForEachVideo: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "_id",
        as: "videos",
      },
    },
    {
      $unwind: "$videos",
    },
    {
      $match: {
        "videos.owner": userId,
      },
    },
    {
      $group: {
        _id: null,
        totalLikes: { $sum: "$likeCountForEachVideo" },
      },
    },
  ]);

  let tweetLikesCount = await Like.aggregate([
    {
      $match: {
        tweet: {
          $exists: true,
        },
      },
    },
    {
      $group: {
        _id: "$tweet",
        likeCountForEachTweet: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "tweets",
        localField: "_id",
        foreignField: "_id",
        as: "tweets",
      },
    },
    {
      $unwind: "$tweets",
    },
    {
      $match: {
        "tweets.owner": userId,
      },
    },
    {
      $group: {
        _id: null,
        totalLikes: { $sum: "$likeCountForEachTweet" },
      },
    },
  ]);

  return res.status(200).json(
    new apiResponse(
      200,
      {
        videoCount,
        subscriberCount,
        totalVideoViews: videoViewsCount[0]?.totalViews || 0,
        totalCommentLikesCount: commentLikesCount[0]?.totalLikes || 0,
        totalVideoLikesCount: videoLikesCount[0]?.totalLikes || 0,
        totalTweetLikesCount: tweetLikesCount[0]?.totalLikes || 0,
      },
      "Channel stats fetched successfully"
    )
  );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new apiError(400, "User ID not found");
  }

  if (!Types.ObjectId.isValid(userId)) {
    throw new apiError(400, "Invalid User ID");
  }

  const video = await Video.find({ owner: userId });

  if (video.length === 0) {
    throw new apiError(404, "No videos found for this channel");
  }

  return res
    .status(200)
    .json(new apiResponse(200, video, "Videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
