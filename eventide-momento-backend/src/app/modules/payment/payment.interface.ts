export interface IPaymentBody {
  userId: string;
  eventId: string;
  hostId: string;
  paidAmount: number;
  currency?: string;
  email?: string;
}
