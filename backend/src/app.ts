import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// Middleware - functions that have access to the request and response objects
// app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Adding the server which hosts our app to whitelist

app.options("*", cors()); // include before other routes

app.use(
  cors({
    origin: "https://ai-chatbot-front-end.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
  }) // frontend URL
); // Adding the server which hosts our app to whitelist
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Remove this in production - only for development
// app.use(morgan("dev"));

// After we make a request to the api/v1 endpoint, handled by appRouter
app.use("/api/v1", appRouter);

export default app;
