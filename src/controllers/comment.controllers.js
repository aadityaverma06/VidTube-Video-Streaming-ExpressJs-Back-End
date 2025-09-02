import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.models.js";
import { Video } from "../models/video.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Types } from "mongoose";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Video Id is not an ObjectId");
  }

  const isVideoExisting = await Video.findOne({
    _id: videoId,
  });
  if (!isVideoExisting) {
    throw new apiError(404, "Video not found");
  }

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const comments = Comment.aggregate([
    {
      $match: {
        video: Types.ObjectId.createFromHexString(videoId),
      },
    },
  ]);

  const paginatedComments = await Comment.aggregatePaginate(comments, options);

  if (!paginatedComments.docs.length) {
    throw new apiError(404, "No comments found for this video");
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, paginatedComments, "Comments for the Video Returned")
    );
});

const addComment = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new apiError(400, "Comment body not found");
  }
  const { content } = req.body;
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

  if (!content) {
    throw new apiError(400, "Comment Content not found in body");
  }

  const isCommentExisting = await Comment.findOne({
    video: videoId,
    owner: req.user._id,
  });

  if (isCommentExisting) {
    throw new apiError(400, "Comment for this video for this user already exists");
  }
  const comment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id,
  });

  if (!comment) {
    throw new apiError(500, "Comment not created");
  }

  return res.status(201).json(new apiResponse(201, comment, "Comment created"));
});

const updateComment = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new apiError(400, "Comment body not found");
  }
  const { commentId } = req.params;
  const { content } = req.body;

  if (!Types.ObjectId.isValid(commentId)) {
    throw new apiError(400, "Comment Id is not an ObjectId");
  }

  if (!content) {
    throw new apiError(400, "Comment Content not found in body");
  }

  const isCommentExisting = await Comment.findOne({
    _id: commentId,
  });

  if (!isCommentExisting) {
    throw new apiError(404, "Comment not found");
  }

  if (isCommentExisting.owner.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to update this comment as you are not the owner");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      content,
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new apiResponse(200, updatedComment, "Comment Updated"));
});

const deleteComment = asyncHandler(async (req, res) => {
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

  if (isCommentExisting.owner.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to delete this comment as you are not the owner");
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment) {
    throw new apiError(500, "Comment not deleted");
  }

  return res
    .status(200)
    .json(new apiResponse(200, deletedComment, "Comment Deleted"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
