import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// Augment Express.User so req.user!.id is typed correctly
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string | null;
      firstName: string | null;
      lastName: string | null;
      profileImageUrl: string | null;
    }
  }
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  setupAuth(app);

  app.get(api.progress.get.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const progress = await storage.getUserProgress(req.user!.id);
    res.json(progress);
  });

  app.post(api.progress.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const { stepId, status } = req.body;
    const updated = await storage.updateUserProgress(req.user!.id, stepId, status);
    res.json(updated);
  });

  return httpServer;
}
