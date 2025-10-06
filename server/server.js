import cors from "cors";
import "dotenv/config";
import express from "express";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./src/db/connectDB.js";
import webhookController from "./src/controllers/webhookController.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import JobRoutes from "./src/routes/JobRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import Cloudinary from "./src/utils/cloudinary.js";

const app = express();

// ✅ CORS configuration
const allowedOrigins = ["https://job-portal-ug8s.vercel.app"]; // your frontend URL

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"]
}));

app.use(express.json());
app.use(clerkMiddleware());

await connectDB();
await Cloudinary();

app.get("/", (req, res) => res.send("Api is working"));

app.post("/webhook", webhookController);
app.use("/api/company", companyRoutes);
app.use("/api/job", JobRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server is running on port http://localhost:${PORT}`);
});
