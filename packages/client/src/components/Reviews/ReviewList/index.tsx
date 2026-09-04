import { FaHandSparkles } from 'react-icons/fa';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import StarRating from '../StarRating';
import { reviewsApi } from './reviewsApi';

interface Props {
  productId: number;
}

const ReviewList = ({ productId }: Props) => {
  const { data, isLoading, error } = reviewsApi.fetchReviews(productId);
  const summaryMutation = reviewsApi.summarizeReviews(productId);

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
