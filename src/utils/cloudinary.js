import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import { apiError } from "../utils/apiError.js";

dotenv.config({
  path: "./src/.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(`File uploaded on Cloudinary, File src: ${response.url}`);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const uploadOnCloudinaryVideo = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "video",
    });
    console.log(`Video uploaded on Cloudinary, Video src: ${response.url}`);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const destroyed = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    if (destroyed.result === "not found") {
      throw new apiError(404, "File not found");
    }
    console.log(`Deleted from Cloudinary, for Public ID: ${publicId}`);
  } catch (error) {
    console.log("Error deleting from Cloudinary", error);
    return null;
  }
};

const deleteFromCloudinaryVideo = async (publicId) => {
  try {
    const destroyed = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });
    if (destroyed.result === "not found") {
      throw new apiError(404, "File not found");
    }
    console.log(`Deleted from Cloudinary, for Public ID: ${publicId}`);
  } catch (error) {
    console.log("Error deleting from Cloudinary", error);
    return null;
  }
};

const extractThumbnailFromVideo = (videoFilePath) => {
  try {
    const thumbnailUrl = cloudinary.url(`${videoFilePath}.jpg`, {
      start_offset: "auto",
      resource_type: "video",
    });
    return thumbnailUrl;
  } catch (error) {
    throw new apiError(500, "Error extracting thumbnail");
  }
};

export {
  uploadOnCloudinary,
  uploadOnCloudinaryVideo,
  deleteFromCloudinary,
  deleteFromCloudinaryVideo,
  extractThumbnailFromVideo,
};
