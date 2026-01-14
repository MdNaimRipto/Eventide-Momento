"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const reviews_controller_1 = require("./reviews.controller");
const zodValidationRequest_1 = __importDefault(require("../../../middlewares/zodValidationRequest"));
const reviews_validation_1 = require("./reviews.validation");
const router = express_1.default.Router();
router.post("/", (0, zodValidationRequest_1.default)(reviews_validation_1.ReviewValidation.createReviewZodSchema), reviews_controller_1.ReviewController.createReview);
router.get("/", reviews_controller_1.ReviewController.getAllReviews);
router.get("/host/:hostId", reviews_controller_1.ReviewController.getReviewsByHost);
exports.ReviewRouter = router;
