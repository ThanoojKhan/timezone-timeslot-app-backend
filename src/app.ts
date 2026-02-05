import express from "express";
import cors from "cors";
import morgan from "morgan";
import timeRoutes from "./routes/timeRoutes";
import ENV from "./config/env";

const app = express();

app.use(cors());
if (ENV.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("combined"));
} // Used for logging

app.use(express.json({ limit: "5mb" }));

//Health check
app.get("/", (_req, res) => {
    res.send("Server is running");
});

app.use("/api", timeRoutes);

export default app;