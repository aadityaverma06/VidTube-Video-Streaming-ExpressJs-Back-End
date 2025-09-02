import { Types } from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new apiError(400, "Tweet body not found");
  }

  const { content } = req.body;

  if (!content) {
    throw new apiError(400, "Tweet content not found");
  }

  const userId = req.user._id;
  const newTweet = await Tweet.create({
    content,
    owner: userId,
  });

  if (!newTweet) {
    throw new apiError(500, "Error creating tweet");
  }

  return res
    .status(201)
    .json(new apiResponse(201, newTweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new apiError(400, "User ID not found");
  }

  if (!Types.ObjectId.isValid(userId)) {
    throw new apiError(400, "Invalid User ID");
  }

  const tweetsList = await Tweet.find({ owner: userId });

  if (tweetsList.length === 0) {
    throw new apiError(404, "No tweets found for this user");
  }

  return res
    .status(200)
    .json(new apiResponse(200, tweetsList, "Tweets found successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!Types.ObjectId.isValid(tweetId)) {
    throw new apiError(400, "Tweet Id is not an ObjectId");
  }

  if (!req.body) {
    throw new apiError(400, "Tweet body not found");
  }

  const { content } = req.body;

  if (!content) {
    throw new apiError(400, "Tweet content not found");
  }

  const isTweetExisting = await Tweet.findOne({
    _id: tweetId,
  });

  if (!isTweetExisting) {
    throw new apiError(404, "Tweet not found");
  }

  if (isTweetExisting.owner.toString() !== req.user._id.toString()) {
    throw new apiError(
      403,
      "You are not authorized to update this tweet as you are not the owner"
    );
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    { content },
    { new: true }
  );

  if (!updatedTweet) {
    throw new apiError(500, "Error updating tweet");
  }

  return res
    .status(200)
    .json(new apiResponse(200, updatedTweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
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

  if (isTweetExisting.owner.toString() !== req.user._id.toString()) {
    throw new apiError(
      403,
      "You are not authorized to delete this tweet as you are not the owner"
    );
  }

  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);

  if (!deletedTweet) {
    throw new apiError(500, "Error deleting tweet");
  }

  return res
    .status(200)
    .json(new apiResponse(200, deletedTweet, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
