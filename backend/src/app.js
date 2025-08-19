import express from "express";
import cors from "cors";
import { Error } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import slotCleanup from "./cron/slotCleanup.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// routes import
import authRoutes from "./routes/auth.route.js";
import turfRoutes from "./routes/turf.route.js";
import slotRoutes from "./routes/slot.route.js";
import bookingRoutes from "./routes/booking.route.js";

// routes declaration  
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/turf", turfRoutes);
app.use("/api/v1/slot", slotRoutes);
app.use("/api/v1/booking", bookingRoutes);

// Cron jobs
slotCleanup();

// Middleware for Errors  
app.use(Error);     

export { app };
