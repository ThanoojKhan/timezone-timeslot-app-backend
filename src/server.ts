import http from "http";
import app from "./app";
import ENV from "./config/env";
import { connectMongoDB, disconnectMongoDB } from "./config/mongodb";

const port = ENV.PORT;
const server = http.createServer(app);

async function startServer() {
  try {
    await connectMongoDB();

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();

/* graceful shutdown */
async function shutdown(signal: NodeJS.Signals) {
  console.log(`Received ${signal}. Shutting down...`);

  try {
    await disconnectMongoDB();

    server.close(() => {
      process.exit(0);
    });

    setTimeout(() => process.exit(1), 10000);
  } catch {
    process.exit(1);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  shutdown("SIGTERM");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  shutdown("SIGTERM");
});