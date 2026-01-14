"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cloudinary_config_1 = __importDefault(require("./cloudinary.config"));
const uploadImage = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_config_1.default.uploader.upload_stream({
            folder: "eventide-momento",
            resource_type: "auto",
        }, (error, result) => {
            if (error || !result) {
                return reject(error);
            }
            resolve({
                url: result.secure_url,
                publicId: result.public_id,
            });
        });
        stream.end(buffer);
    });
});
// Delete Image
const deleteImage = (url) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await cloudinary.uploader.destroy(`${publicId}`);
    const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
    console.log(url);
    const match = url.publicId.toString().match(regex);
    console.log({ match });
    if (match && match[1]) {
        const public_id = match[1];
        const result = yield cloudinary_config_1.default.uploader.destroy(public_id);
        console.log(`File ${public_id} is deleted from cloudinary`);
        if (result.result === "not found") {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete image");
        }
    }
    return null;
});
exports.ImageService = {
    uploadImage,
    deleteImage,
};
