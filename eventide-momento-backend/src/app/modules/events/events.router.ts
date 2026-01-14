import express from "express";
import { EventController } from "./events.controller";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { EventValidation } from "./events.validation";

const router = express.Router();

router.post(
  "/",
  zodValidationRequest(EventValidation.createEventZodSchema),
  EventController.createEvent,
);

router.get("/", EventController.getAllEvents);

router.get("/host/:id", EventController.getEventsByHost);

router.get("/:id", EventController.getEventDetails);

router.patch(
  "/:id",
  zodValidationRequest(EventValidation.updateEventZodSchema),
  EventController.updateEvent,
);

router.delete("/:id", EventController.deleteEvent);

export const EventRouter = router;
