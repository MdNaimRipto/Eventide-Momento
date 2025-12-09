import { IEvent } from "./eventTypes";

export interface IOrder {
  userId: string;
  hostId: string;
  eventId: IEvent;
  paidAmount: number;
  transectionId: string;
  paymentDate?: string;
}
