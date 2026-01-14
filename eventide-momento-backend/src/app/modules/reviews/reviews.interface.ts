export interface IReview {
  userId: string;
  hostId: string;
  review: string;
  rating: number;
}

export interface IReviewFilters {
  searchTerm?: string;
  userId?: string;
  hostId?: string;
  rating?: number;
}
