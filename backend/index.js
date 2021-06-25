import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import "express-async-errors";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}...`.yellow
      .bold
  );
});

export default server;
