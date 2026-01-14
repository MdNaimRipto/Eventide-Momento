import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IEvent, IEventFilters } from "./events.interface";
import { IPaginationOptions } from "../../../interface/pagination";
import { EventSearchableFields } from "./events.constant";
import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import { roleCheck } from "../../../utils/roleCheck";
import prisma from "../../../config/prisma";
import { Prisma } from "@prisma/client";
import { ImageService } from "../images/images.service";

const Events = prisma.event;

// Create Event
const createEvent = async (payload: IEvent, token: string): Promise<null> => {
  const { id, email } = jwtHelpers.jwtVerify(token, config.jwt_access_secret);
  const isAdminOrHost = await roleCheck(email, String(id), ["ADMIN", "HOST"]);
  if (!isAdminOrHost) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "This account has no access to upload event!"
    );
  }
  const event = await Events.create({
    data: {
      eventName: payload.eventName,
      description: payload.description,
      eventDate: payload.eventDate,
      category: payload.category,
      entryFee: payload.entryFee ?? 0,
      location: payload.location,
      banner: payload.banner,
      minParticipants: payload.minParticipants ?? 0,
      maxParticipants: payload.maxParticipants ?? 0,
      detailedInformations: payload.detailedInformations,
      host: {
        connect: { id: String(id) },
      },
    },
  });

  if (!event) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create event");
  }

  return null;
};

// Get All Events
const getAllEvents = async (
  filters: IEventFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filterData } = filters;
  const AND: any[] = [];

  if (searchTerm) {
    AND.push({
      OR: EventSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })) as any,
    });
  }

  if (Object.keys(filterData).length > 0) {
    AND.push({
      ...filterData,
    });
  }

  const where = AND.length > 0 ? { AND } : {};
  console.log(where);

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const orderBy: Prisma.EventOrderByWithRelationInput | undefined =
    sortBy && sortOrder
      ? { [sortBy]: sortOrder.toLowerCase() as "asc" | "desc" }
      : undefined;

  const result = await prisma.event.findMany({
    where,
    skip,
    take: limit,
    orderBy,
  });

  const total = await prisma.event.count({ where });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Event
const getEventDetails = async (id: string): Promise<IEvent | null> => {
  const event = await Events.findUnique({
    where: { id },
    include: {
      host: {
        select: {
          userName: true,
          email: true,
          createdAt: true,
          profileImage: true,
        },
      },
    },
  });

  return event;
};

// Update Event
const updateEvent = async (
  id: string,
  payload: Partial<IEvent>,
  token: string
): Promise<null> => {
  const { id: uid, email } = jwtHelpers.jwtVerify(
    token,
    config.jwt_access_secret
  );
  const isAdminOrHost = await roleCheck(email, String(uid), ["ADMIN", "HOST"]);
  if (!isAdminOrHost) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "This account has no access to upload event!"
    );
  }
  const event = await Events.update({
    where: {
      id: id,
    },
    data: payload,
  });

  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }

  return null;
};

// Delete Event
export const deleteEvent = async (id: string, token: string): Promise<null> => {
  const { id: uid, email } = jwtHelpers.jwtVerify(
    token,
    config.jwt_access_secret
  );
  const isAdminOrHost = await roleCheck(email, String(uid), ["ADMIN", "HOST"]);
  if (!isAdminOrHost) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "This account has no access to delete event!"
    );
  }

  await prisma.$transaction(async (tx) => {
    // 1. Check if event exists
    const event = await tx.event.findUnique({ where: { id } });

    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
    }

    // 2. Delete the image from Cloudinary (outside of DB but logically part of transaction)
    if (event.banner) {
      await ImageService.deleteImage({
        publicId: event.banner, // better to send URL and let service extract publicId
      });
    }

    // 3. Delete the event
    await tx.event.delete({ where: { id } });
  });

  return null;
};

// Get Events by Host
const getEventsByHost = async (
  paginationOptions: IPaginationOptions,
  hostId: string
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const orderBy: Prisma.EventOrderByWithRelationInput | undefined =
    sortBy && sortOrder
      ? { [sortBy]: sortOrder.toLowerCase() as "asc" | "desc" }
      : undefined;

  const where = {
    hostId,
  };

  const result = await prisma.event.findMany({
    where,
    skip,
    take: limit,
    orderBy,
  });

  const total = await prisma.event.count({ where });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const EventService = {
  createEvent,
  getAllEvents,
  getEventDetails,
  updateEvent,
  deleteEvent,
  getEventsByHost,
};
