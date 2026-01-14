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
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
  host?: {
    userName: "MD Naimur Rahman";
    email: "host@gmail.com";
    createdAt: "2026-01-14T11:35:01.195Z";
    profileImage: "https://i.ibb.co/dcHVrp8/User-Profile-PNG-Image.png";
  };
}

export interface IEventFilters {
  searchTerm?: string;
  category?: string;
  status?: string;
  hostId?: string;
}
