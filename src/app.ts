// // src/app.ts
// import express, { Application } from "express";
// import { setupSwagger } from "./utils/swagger";
// import morgan from "morgan";

// import productRoutes from "./routes/productRoutes";
// import userRoutes from "./routes/userRoutes";
// import authRoutes from "./routes/authRoutes";

// const app: Application = express();

// // Middleware
// app.use(express.json());
// app.use(morgan("dev"));

// // Setup Swagger
// setupSwagger(app);

// // Routes
// app.use("/api/users", authRoutes);
// app.use("/api", productRoutes);
// app.use("/api", userRoutes);

// export default app;

// src/app.ts
import express, { Application } from "express";
import { setupSwagger } from "./utils/swagger";
import morgan from "morgan";

import cartRoutes from "./routes/cartRoutes";
import discountRoutes from "./routes/discountRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import orderRoutes from "./routes/orderRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import productRoutes from "./routes/productRoutes";
import shippingRoutes from "./routes/shippingRoutes";
import userRoutes from "./routes/userRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Setup Swagger
setupSwagger(app);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", discountRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);
app.use("/api", productRoutes);
app.use("/api", shippingRoutes);

app.use(errorMiddleware);

export default app;
