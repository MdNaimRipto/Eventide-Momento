export interface IOrder {
  userId: string;
  eventId: string;
  hostId: string;
  paidAmount: number;
  transectionId: string;
  paymentDate?: string;
}

export type IOrderFilters = {
  searchTerm?: string;
  userId?: string;
  eventId?: string;
  transectionId?: string;
};
