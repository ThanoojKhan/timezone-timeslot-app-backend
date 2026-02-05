import express from "express";
import cors from "cors";
import morgan from "morgan";
import timeRoutes from "./routes/timeRoutes";

const app = express();

app.use(cors());
app.use(morgan("combined")); // Used for logging

app.use(express.json({ limit: "5mb" }));

//Health check
app.get("/", (_req, res) => {
    res.send("Server is running");
});

app.use("/api", timeRoutes);

export default app;