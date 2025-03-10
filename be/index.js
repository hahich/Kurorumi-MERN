import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import uploadRouter from "./routes/upload.route.js";
import subCategoryRouter from "./routes/subCategory.route.js";
import productRouter from "./routes/products.route.js";
import cartRouter from "./routes/cart.route.js"
import addressRouter from "./routes/address.route.js";
import orderRouter from "./routes/order.route.js";

const app = express();

// Cấu hình CORS với nguồn cụ thể
const corsOptions = {
  origin: 'http://localhost:5173', // Đặt nguồn mà bạn muốn cho phép
  credentials: true, // Cho phép gửi cookie
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Server is running on port " + port,
  });
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter)
app.use("/api/file", uploadRouter)
app.use("/api/subCategory", subCategoryRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use("/api/order", orderRouter)

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server is running on port", port);
  });
});

export default { app }