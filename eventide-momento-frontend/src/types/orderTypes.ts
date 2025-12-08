import { IEvent } from "./eventTypes";

export interface IOrder {
  userId: string;
  eventId: IEvent;
  paidAmount: number;
  transectionId: string;
  paymentDate?: string;
}
