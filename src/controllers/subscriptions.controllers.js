import { Types } from "mongoose";
import { Subscription } from "../models/subscription.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!Types.ObjectId.isValid(channelId)) {
    throw new apiError(400, "Channel Id is not an ObjectId");
  }

  const isChannelExisting = await User.findOne({
    _id: channelId,
  });

  if (!isChannelExisting) {
    throw new apiError(404, "Channel not found");
  }

  const isSubscribed = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId,
  });

  if (isSubscribed) {
    const deletedSubscription = await Subscription.findByIdAndDelete(
      isSubscribed._id
    );

    return res
      .status(200)
      .json(
        new apiResponse(200, deletedSubscription, "Unsubscribed successfully")
      );
  } else {
    const newSubscription = await Subscription.create({
      subscriber: req.user._id,
      channel: channelId,
    });
    return res
      .status(201)
      .json(new apiResponse(201, newSubscription, "Subscribed successfully"));
  }
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!Types.ObjectId.isValid(channelId)) {
    throw new apiError(400, "Channel Id is not an ObjectId");
  }

  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const subscriberList = Subscription.aggregate([
    {
      $match: {
        channel: Types.ObjectId.createFromHexString(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
      },
    },
    {
      $unwind: "$subscriber",
    },
    {
      $project: {
        "subscriber._id": 1,
        "subscriber.username": 1,
        "subscriber.email": 1,
      },
    },
  ]);
  const paginatedSubscriberList = await Subscription.aggregatePaginate(
    subscriberList,
    options
  );
  if (paginatedSubscriberList.docs.length === 0) {
    throw new apiError(404, "No subscribers found for this channel");
  }
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        paginatedSubscriberList,
        "Subcriber list fetched successfully"
      )
    );
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!Types.ObjectId.isValid(subscriberId)) {
    throw new apiError(400, "Subscriber Id is not an ObjectId");
  }

  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const channelList = Subscription.aggregate([
    {
      $match: {
        subscriber: Types.ObjectId.createFromHexString(subscriberId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "Subscribedchannel",
      },
    },
    {
      $unwind: "$Subscribedchannel",
    },
    {
      $project: {
        "Subscribedchannel._id": 1,
        "Subscribedchannel.username": 1,
        "Subscribedchannel.email": 1,
        "Subscribedchannel.fullName": 1,
      },
    },
  ]);

  const paginatedChannelList = await Subscription.aggregatePaginate(
    channelList,
    options
  );

  if (paginatedChannelList.docs.length === 0) {
    throw new apiError(404, "No channels found for this subscriber");
  }
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        paginatedChannelList,
        "Subscribed channel list fetched successfully"
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
