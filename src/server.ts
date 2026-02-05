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

// Start the server
startServer();


async function shutdown(signal: string) {
  try {
    await disconnectMongoDB();

    server.close(() => {
      process.exit(0);
    });
  } catch (error) {
    process.exit(1);
  }
}

// Shutdown the server
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);