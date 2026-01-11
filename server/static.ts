import express, { type Express } from "express";
import path from "path";

// ✅ FIX: Use project root safely (Render + local)
const __dirname = process.cwd();

export function serveStatic(app: Express) {
  const clientPath = path.resolve(__dirname, "client");

  // Serve static assets
  app.use(express.static(clientPath));

  // Serve pages
 // Serve specific HTML pages for routes
  // Root now serves the marketplace (public landing page)
  app.get("/", (_req, res) => {
    res.sendFile(path.resolve(clientPath, "marketplace.html"));
  });

  app.get("/marketplace", (_req, res) => {
    res.sendFile(path.resolve(clientPath, "marketplace.html"));
  });

  app.get("/dashboard", (_req, res) => {
    res.sendFile(path.resolve(clientPath, "index.html"));
  });

  app.get("/admin", (_req, res) => {
    res.sendFile(path.resolve(clientPath, "admin.html"));
  });

  // SPA fallback (exclude API routes)
  app.use("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api/")) {
      return next();
    }
    res.sendFile(path.resolve(clientPath, "index.html"));
  });
}
