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
import reviewRoutes from "./routes/reviewRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";
import sliderRoutes from "./routes/sliderRoutes";
import path from "path";

const app: Application = express();

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Setup Swagger
setupSwagger(app);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/inventories", inventoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/slider", sliderRoutes);

app.use(errorMiddleware);

export default app;
