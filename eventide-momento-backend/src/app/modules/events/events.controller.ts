import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { EventService } from "./events.service";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/shared";
import { EventFilterableFields } from "./events.constant";
import { paginationFields } from "../../../constants/pagination.constant";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

// Create Event
const createEvent = catchAsync(async (req: Request, res: Response) => {
  const { ...eventInfo } = req.body;
  const token = jwtHelpers.verifyAuthToken(req);

  const result = await EventService.createEvent(eventInfo, token);

  sendResponse(res, {
    message: "Event Created Successfully",
    data: result,
  });
});

// Get All Events
const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, EventFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await EventService.getAllEvents(filters, paginationOptions);

  sendResponse(res, {
    message: "Events Retrieved Successfully",
    data: result,
  });
});

// Get Single Event
const getEventDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await EventService.getEventDetails(id);

  sendResponse(res, {
    message: "Event Retrieved Successfully",
    data: result,
  });
});

// Update Event
const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;
  const token = jwtHelpers.verifyAuthToken(req);

  const result = await EventService.updateEvent(id, updatedData, token);

  sendResponse(res, {
    message: "Event Updated Successfully",
    data: result,
  });
});

// Delete Event
const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = jwtHelpers.verifyAuthToken(req);

  const result = await EventService.deleteEvent(id, token);

  sendResponse(res, {
    message: "Event Deleted Successfully",
    data: result,
  });
});

// Get Events by Host
const getEventsByHost = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const { id } = req.params;

  const result = await EventService.getEventsByHost(paginationOptions, id);

  sendResponse(res, {
    message: "Host Events Retrieved Successfully",
    data: result,
  });
});

export const EventController = {
  createEvent,
  getAllEvents,
  getEventDetails,
  updateEvent,
  deleteEvent,
  getEventsByHost,
};
