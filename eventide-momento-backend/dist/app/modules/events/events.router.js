"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRouter = void 0;
const express_1 = __importDefault(require("express"));
const events_controller_1 = require("./events.controller");
const zodValidationRequest_1 = __importDefault(require("../../../middlewares/zodValidationRequest"));
const events_validation_1 = require("./events.validation");
const router = express_1.default.Router();
router.post("/", (0, zodValidationRequest_1.default)(events_validation_1.EventValidation.createEventZodSchema), events_controller_1.EventController.createEvent);
router.get("/", events_controller_1.EventController.getAllEvents);
router.get("/host/:id", events_controller_1.EventController.getEventsByHost);
router.get("/:id", events_controller_1.EventController.getEventDetails);
router.patch("/:id", (0, zodValidationRequest_1.default)(events_validation_1.EventValidation.updateEventZodSchema), events_controller_1.EventController.updateEvent);
router.delete("/:id", events_controller_1.EventController.deleteEvent);
exports.EventRouter = router;
