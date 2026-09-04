import { useMutation, useQuery } from '@tanstack/react-query';
import type { ReviewResponseType, SummarizeResponseType } from './types';

export const reviewsApi = {
  fetchReviews(productId: number) {
    const response = useQuery<ReviewResponseType>({
      queryKey: ['reviews', productId],
      queryFn: async () => {
        try {
          const response = await fetch(`/api/products/${productId}/reviews`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
          });
          if (!response.ok) {
            throw new Error(`Oops status: ${response.status}`);
          }

          return response.json();
        } catch (error) {
          throw error;
        }
      },
    });
    return response;
  },
  summarizeReviews(productId: number) {
    const summaryMutation = useMutation<SummarizeResponseType>({
      mutationKey: ['review-mutation'],
      mutationFn: async () => {
        const response = await fetch(
          `/api/products/${productId}/reviews/summarize`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json;charset=utf-8',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Unable to summaries the review');
        }

        return await response.json();
      },
    });

    return summaryMutation;
  },
};
