import express from "express";
import fs from "fs";
import { createServer } from "http";
import { createServer as createHttpsServer } from "https";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const httpPort = process.env.PORT || 3000;
  const httpsPort = process.env.HTTPS_PORT || 443;

  server.listen(httpPort, () => {
    console.log(`HTTP server running on http://localhost:${httpPort}/`);
  });

  // Start HTTPS server with self-signed cert for Cloudflare Full SSL
  const certDir = path.resolve(__dirname, process.env.NODE_ENV === "production" ? "certs" : path.join("..", "server", "certs"));
  const certPath = path.join(certDir, "cert.pem");
  const keyPath = path.join(certDir, "key.pem");

  if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    const httpsServer = createHttpsServer(
      {
        cert: fs.readFileSync(certPath),
        key: fs.readFileSync(keyPath),
      },
      app,
    );

    httpsServer.listen(httpsPort, () => {
      console.log(`HTTPS server running on https://localhost:${httpsPort}/`);
    });
  }
}

startServer().catch(console.error);
