import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./helpers/errorHandlers.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth/auth.js";
import categoryRoutes from "./routes/category/category.js";
import postRoutes from "./routes/post/post.js";
dotenv.config();

const app = express();

// ── Middleware ────────────────────────────────────────────
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// ── Health Check ──────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Blog CMS API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);

// ── 404 Handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global Error Handler ──────────────────────────────────
app.use(errorHandler);

export default app;
