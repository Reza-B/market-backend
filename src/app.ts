// src/app.ts
import express, { Application } from "express";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import { setupSwagger } from "./swagger";
import morgan from "morgan";
import pingRoutes from "./routes/pingRoutes";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Setup Swagger
setupSwagger(app);

// Routes
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", pingRoutes);

export default app;
