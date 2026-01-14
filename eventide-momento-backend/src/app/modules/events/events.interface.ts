export type eventStatusEnums =
  | "UPCOMING"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELED";
export type eventCategoryEnums =
  | "SPORTS"
  | "MUSIC"
  | "TECHNOLOGY"
  | "BUSINESS"
  | "ARTS"
  | "EDUCATION"
  | "SOCIAL";

export interface IEvent {
  hostId: string;
  eventName: string;
  description: string;
  eventDate: Date;
  category: eventCategoryEnums;
  status: eventStatusEnums;
  entryFee: number;
  totalParticipants: number;
  detailedInformations: string[];
  location: string;
  banner: string;
  minParticipants: number;
  maxParticipants: number;
}

export interface IEventFilters {
  searchTerm?: string;
  category?: string;
  status?: string;
  hostId?: string;
}
