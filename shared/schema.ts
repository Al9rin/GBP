import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export * from "./models/auth";

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  stepId: integer("step_id").notNull(),
  status: text("status").notNull().default("pending"), // 'completed', 'skipped', 'pending'
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProgressSchema = createInsertSchema(userProgress).omit({ id: true, updatedAt: true });
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertProgressSchema>;
