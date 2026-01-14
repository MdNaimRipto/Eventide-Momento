import { eventStatusEnums, eventCategoryEnums } from "./events.interface";

export const EventStatusEnums: eventStatusEnums[] = [
  "UPCOMING",
  "ONGOING",
  "COMPLETED",
  "CANCELED",
];

export const EventCategoryEnums: eventCategoryEnums[] = [
  "SPORTS",
  "MUSIC",
  "TECHNOLOGY",
  "BUSINESS",
  "ARTS",
  "EDUCATION",
  "SOCIAL",
];

export const EventSearchableFields = ["eventName", "location", "category"];

export const EventFilterableFields = [
  "searchTerm",
  "category",
  "status",
  "hostId",
];
