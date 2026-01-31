import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import requirementRoutes from "./routes/requirements.js";

dotenv.config({ quiet: true });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/requirements", requirementRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(console.error);
app.listen(4000, () =>
      console.log("Server running on http://localhost:4000")
    );