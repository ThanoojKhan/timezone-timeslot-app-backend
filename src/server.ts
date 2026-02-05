import http from "http";
import app from "./app";
import ENV from "./config/env";
import { connectMongoDB } from "./config/mongodb";
import { setupShutdownHandlers } from "./bootstrap/shutdown";

const port = ENV.PORT;
const server = http.createServer(app);

async function startServer() {
  try {
    await connectMongoDB();

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

    setupShutdownHandlers(server);
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();