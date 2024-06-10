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

//app.options("*", cors()); // include before other routes

// const corsOptions = {
//   origin: "https://ai-chatbot-front-end.vercel.app",
//   methods: ["GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS"],
//   credentials: true,
//   // allowedHeaders: "Content-Type, Authorization",
//   optionsSuccessStatus: 204,
// };

app.use(
  cors({
    origin: [
      "https://ai-chatbot-front-end.vercel.app",
      "https://ai-chatbot-backend-31e52d318a56.herokuapp.com",
    ],
    methods: ["GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS"],
    credentials: true,
    // allowedHeaders: "Content-Type, Authorization",
    optionsSuccessStatus: 204,
  }) // frontend URL
); // Adding the server which hosts our app to whitelist
app.options("*", cors()); // include before other routes

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Remove this in production - only for development
// app.use(morgan("dev"));

// After we make a request to the api/v1 endpoint, handled by appRouter
app.use("/api/v1", appRouter);

export default app;
