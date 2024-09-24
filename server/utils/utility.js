import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { getBase64 } from "../lib/helper.js";

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message),
      this.statusCode = statusCode;
  }
}

const uploadFilsToCloudinary = async (files = []) => {
  // Upload files to cloudinary

  const uploadPromise = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(getBase64(file), {
        resource_type: "auto",
        public_id: uuid()
      }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  });

  try {
    const result = await Promise.all(uploadPromise);

    const formatedResult = result.map((file) => ({
      public_id: file.public_id,
      url: file.secure_url
    }));
    return formatedResult;
  } catch (error) {
    throw new Error("Error while uploading files to cloudinary", error);
  }
  return await Promise.all(uploadPromise);
};

const deleteFileFromCloudinary = async (public_id) => {
  // Delete file from cloudinary
};

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 100,
  httpOnly: true, // Prevent XSS attack cross-site scripting sttacks
  sameSite: "strict", //CSRF attack cross-site request forgery sttacks
  secure: process.env.NODE_ENV !== "development"
};

export { ErrorHandler, uploadFilsToCloudinary, deleteFileFromCloudinary, cookieOptions };