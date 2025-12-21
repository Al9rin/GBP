import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  await setupAuth(app);
  registerAuthRoutes(app);

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
