import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ImageService } from "./images.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const uploadImage = catchAsync(
  async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    const file = req.file;

    if (!file) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "No file provided",
        data: null,
      });
    }

    const result = await ImageService.uploadImage(file.buffer);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Image Uploaded Successfully",
      data: result,
    });
  },
);

// Delete Image
const deleteImage = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  await ImageService.deleteImage(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Image Deleted Successfully",
    data: null,
  });
});

export const ImageController = {
  uploadImage,
  deleteImage,
};
