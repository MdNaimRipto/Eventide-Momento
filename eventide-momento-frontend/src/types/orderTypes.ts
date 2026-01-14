import { IEvent } from "./eventTypes";

export interface IOrder {
  userId: string;
  hostId: string;
  eventId: string;
  paidAmount: number;
  transectionId: string;
  paymentDate?: string;
  event: IEvent;
}
