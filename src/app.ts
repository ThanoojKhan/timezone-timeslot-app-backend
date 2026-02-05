import express from "express";
import cors from "cors";
import morgan from "morgan";
import timeRoutes from "./routes/timeRoutes";
import ENV from "./config/env";
import AppError from "./utils/appError";

const app = express();

//Request logging
app.use(cors());
if (ENV.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("combined"));
}

app.use(express.json({ limit: "5mb" }));

//Health check
app.get("/", (_req, res) => {
    res.send("Server is running");
});

app.use("/api", timeRoutes);

//404
app.use(() => {
    throw new AppError({ statusCode: 404, message: 'Route not found!' });
});

export default app;