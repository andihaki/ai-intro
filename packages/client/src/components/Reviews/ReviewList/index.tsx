import { FaHandSparkles } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import StarRating from '../StarRating';

interface Props {
  productId: number;
}

type ReviewType = {
  id: number;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
};

type ReviewResponseType = {
  summary: string | null;
  reviews: ReviewType[];
};
type SummarizeResponseType = {
  summary: string;
};

const ReviewList = ({ productId }: Props) => {
  const { data, isLoading, error } = useQuery<ReviewResponseType>({
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

  const handleSummarize = async () => {
    await summaryMutation.mutateAsync();
  };

  if (error) {
    return <div className="text-red-400">{error.message}</div>;
  }

  if (isLoading) {
    return (
      <>
        {[1, 2, 3].map((val) => (
          <div key={val} className="flex w-full flex-col gap-2 mb-6 self-start">
            <Skeleton className="h-4 w-50" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-40 w-3/4" />
          </div>
        ))}
      </>
    );
  }

  if (!data?.reviews.length) return null;
  const summary = data?.summary || summaryMutation.data?.summary;

  return (
    <div>
      <div className="mb-5">
        {summary ? (
          <p>{summary}</p>
        ) : (
          <Button
            onClick={handleSummarize}
            disabled={summaryMutation.isPending}
            className="cursor-pointer"
          >
            <FaHandSparkles /> Summarize the Review
          </Button>
        )}
        {summaryMutation.isPending && <Skeleton className="h-4 w-20 my-2" />}
        {summaryMutation.isError && (
          <div className="text-red-400">
            Couldn't Summarize it, please try again later!
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5">
        {data?.reviews.map((review) => (
          <div key={review.id}>
            <div className="font-semibold">{review.author}</div>
            <StarRating value={4} />
            <p className="py-2">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
