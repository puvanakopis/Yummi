import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import path from "path";

import connectDB from "./config/mongodb.js";

import authRouter from "./routes/authRouter.js";
import itemRouter from "./routes/itemRouter.js";
import userRoutes from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRouter.js";
import cartItemRouter from "./routes/cartItemRouter.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Test route
app.get("/", (req, res) => res.send("API is working..."));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartItemRouter);
app.use("/api/orders", orderRouter);
app.use("/api/favourites", favouriteRoutes);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));