import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import dayjs from 'dayjs';

import { PrismaClient } from '../generated/prisma/client';
import type { Review } from '../generated/prisma/client';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

export const reviewRepository = {
  async getReviews(productId: number, limit?: number): Promise<Review[]> {
    return prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },
  async storeReviewSummary(productId: number, summary: string) {
    const now = new Date();
    const expiresAt = dayjs().add(7, 'days').toDate();

    const data = { content: summary, expiresAt, productId, generatedAt: now };

    return prisma.summary.upsert({
      where: { productId },
      create: data,
      update: data,
    });
  },
  async getReviewSummary(productId: number): Promise<string | null> {
    const summary = await prisma.summary.findFirst({
      where: {
        AND: [
          {
            productId,
          },
          {
            expiresAt: {
              gt: new Date(),
            },
          },
        ],
      },
    });

    return summary?.content ?? null;
  },
};
