"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRouter = void 0;
const express_1 = __importDefault(require("express"));
const images_controller_1 = require("./images.controller");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
// Configure multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
});
// Upload Image
router.post("/upload", upload.single("file"), images_controller_1.ImageController.uploadImage);
// Delete Image
router.post("/delete", images_controller_1.ImageController.deleteImage);
exports.ImageRouter = router;
