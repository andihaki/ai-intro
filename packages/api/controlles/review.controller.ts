import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

export const reviewController = {
  async getReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product Id.' });
      return;
    }

    const product = await productRepository.getProduct(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const review = await reviewRepository.getReviews(productId, 1);
    if (!review.length) {
      res.status(400).json({ error: 'Empty review' });
      return;
    }

    const reviews = await reviewRepository.getReviews(productId);
    const summary = await reviewRepository.getReviewSummary(productId);

    res.send({ reviews, summary });
  },
  async summarizeReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product Id.' });
      return;
    }

    const product = await productRepository.getProduct(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const summary = await reviewService.summariseReviews(productId);

    res.send({ summary });
  },
};
