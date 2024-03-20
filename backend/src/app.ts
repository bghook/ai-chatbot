import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

config();
const app = express();

// Middleware - functions that have access to the request and response objects
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Remove this in production - only for development
app.use(morgan("dev"));

// After we make a request to the api/v1 endpoint, handled by appRouter
app.use("/api/v1", appRouter);

export default app;
