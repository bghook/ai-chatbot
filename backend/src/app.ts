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

// app.options("*", cors()); // include before other routes

// const corsOptions = {
//   origin: "https://ai-chatbot-front-end.vercel.app",
//   methods: ["GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS"],
//   credentials: true,
//   // allowedHeaders: "Content-Type, Authorization",
//   optionsSuccessStatus: 204,
// };

// const allowedOrigins = ["https://ai-chatbot-front-end.vercel.app"];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: "GET,POST,PUT,DELETE,HEAD,PATCH",
//     allowedHeaders: "Access-Control-Allow-Origin",
//     credentials: true,
//     //optionsSuccessStatus: 204,
//   })
// );

// app.use(
//   cors({
//     //origin: true,
//     origin: "http://ai-chatbot-front-end.vercel.app",
//     //methods: ["GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS"],
//     credentials: true,
//     allowedHeaders: "Content-Type, Authorization",
//     //optionsSuccessStatus: 204,
//   }) // frontend URL
// ); // Adding the server which hosts our app to whitelist

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "http://ai-chatbot-front-end.vercel.app"
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.options("*", cors()); // include before other routes

// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://ai-chatbot-front-end.vercel.app"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Remove this in production - only for development
// app.use(morgan("dev"));

// After we make a request to the api/v1 endpoint, handled by appRouter
app.use("/api/v1", appRouter);

export default app;
