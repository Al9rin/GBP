import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";

const app = express();
const httpServer = createServer(app);

declare module "http" {
    interface IncomingMessage {
        rawBody: unknown;
    }
}

app.use(
    express.json({
        verify: (req, _res, buf) => {
            req.rawBody = buf;
        },
    }),
);

app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
        capturedJsonResponse = bodyJson;
        return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
        const duration = Date.now() - start;
        if (path.startsWith("/api")) {
            let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
            if (capturedJsonResponse) {
                logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
            }
            console.log(logLine);
        }
    });

    next();
});

// Register routes returns the httpServer, but we likely need to await it
// For Vercel, we can't easily await inside the export, so we might need a different pattern.
// However, registerRoutes mostly sets up express routes.
// The issue is `registerRoutes` signature: `(httpServer, app) => Promise<Server>`
// It awaits `setupAuth`.

// We'll wrap the app setup in a function or promise.
export async function createApp() {
    await registerRoutes(httpServer, app);

    // Serve static files in production (only relevant for instance-based hosting, not Vercel)
    if (process.env.NODE_ENV === "production" && process.env.VERCEL !== "1") {
        serveStatic(app);
    }

    return app;
}

export { app, httpServer };
