import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "auth-token", "Authorization"], //  Added "auth-token"
  })
);

connectDB();

// Routes
app.use("/", uploadRoutes);
app.use("/products", productRoutes);
app.use("/user", userRouter);

// app.get("/", (req, res) => res.send("E-commerce API is running"));

export default app;
