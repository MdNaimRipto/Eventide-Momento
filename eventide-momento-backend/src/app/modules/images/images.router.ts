import express from "express";
import { ImageController } from "./images.controller";
import multer, { StorageEngine } from "multer";

const router = express.Router();

// Configure multer for file uploads
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
});

// Upload Image
router.post("/upload", upload.single("file"), ImageController.uploadImage);

// Delete Image
router.post("/delete", ImageController.deleteImage);

export const ImageRouter = router;
