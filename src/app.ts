// src/app.ts
import express, { Application } from "express";
import { setupSwagger } from "./utils/swagger";
import morgan from "morgan";

import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Setup Swagger
setupSwagger(app);

// Routes
app.use("/api/users", authRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);

export default app;
