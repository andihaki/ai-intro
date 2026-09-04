export type ReviewType = {
  id: number;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
};

export type ReviewResponseType = {
  summary: string | null;
  reviews: ReviewType[];
};
export type SummarizeResponseType = {
  summary: string;
};
