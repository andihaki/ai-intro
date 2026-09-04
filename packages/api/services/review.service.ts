import { llmClient } from '../llm/client';
import { reviewRepository } from '../repositories/review.repository';
import template from '../prompts/summarize-reviews.txt';

export const reviewService = {
  async summariseReviews(productId: number): Promise<string> {
    const existingSummary = await reviewRepository.getReviewSummary(productId);

    if (existingSummary) {
      return existingSummary;
    }

    const reviews = await reviewRepository.getReviews(productId, 2);
    const reviewsString = reviews.map((a) => a.content).join('\n\n');
    const prompt = template.replace('{{reviews}}', reviewsString);

    const response = await llmClient.summarizeReview(prompt);
    reviewRepository.storeReviewSummary(productId, response);

    return response;
  },
};
