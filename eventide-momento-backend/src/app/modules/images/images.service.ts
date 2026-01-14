import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IImageUploadResponse } from "./images.interface";
import cloudinary from "./cloudinary.config";

const uploadImage = async (buffer: Buffer): Promise<IImageUploadResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "eventide-momento",
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    stream.end(buffer);
  });
};

// Delete Image
const deleteImage = async (url: { publicId: string }): Promise<null> => {
  // const result = await cloudinary.uploader.destroy(`${publicId}`);
  const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
  console.log(url);

  const match = url.publicId.toString().match(regex);

  console.log({ match });

  if (match && match[1]) {
    const public_id = match[1];
    const result = await cloudinary.uploader.destroy(public_id);
    console.log(`File ${public_id} is deleted from cloudinary`);
    if (result.result === "not found") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete image");
    }
  }
  return null;
};

export const ImageService = {
  uploadImage,
  deleteImage,
};
