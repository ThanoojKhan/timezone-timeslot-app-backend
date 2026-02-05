import { Server } from "http";
import { disconnectMongoDB } from "../config/mongodb";

let isShuttingDown = false;

export function setupShutdownHandlers(server: Server) {
    async function shutdown(signal: NodeJS.Signals) {
        if (isShuttingDown) return;
        isShuttingDown = true;

        console.log(`Received ${signal}. Shutting down...`);

        try {
            await disconnectMongoDB();

            server.close(() => process.exit(0));

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
}