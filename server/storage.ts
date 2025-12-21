import { userProgress, type UserProgress } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUserProgress(userId: string): Promise<UserProgress[]>;
  updateUserProgress(userId: string, stepId: number, status: string): Promise<UserProgress>;
}

export class DatabaseStorage implements IStorage {
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async updateUserProgress(userId: string, stepId: number, status: string): Promise<UserProgress> {
    const [existing] = await db.select().from(userProgress).where(and(eq(userProgress.userId, userId), eq(userProgress.stepId, stepId)));
    
    if (existing) {
      const [updated] = await db.update(userProgress)
        .set({ status, updatedAt: new Date() })
        .where(eq(userProgress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(userProgress)
        .values({ userId, stepId, status })
        .returning();
      return created;
    }
  }
}

export const storage = new DatabaseStorage();
