import { z } from 'zod';
import { insertProgressSchema, userProgress } from './schema';

export const api = {
  progress: {
    get: {
      method: 'GET' as const,
      path: '/api/progress',
      responses: {
        200: z.array(z.custom<typeof userProgress.$inferSelect>()),
      },
    },
    update: {
      method: 'POST' as const,
      path: '/api/progress',
      input: insertProgressSchema.pick({ stepId: true, status: true }),
      responses: {
        200: z.custom<typeof userProgress.$inferSelect>(),
      },
    },
  },
};
