
import express from "express";
import cors from "cors";
import { connectDB } from "../database/db.js";
import { ENV } from "../config/env.config.js";
import routes from "../routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

connectDB();

app.get("/", (_, res) => res.send("Mock E-Com Cart TS Backend Running"));

app.listen(ENV.PORT, () => console.log(`🚀 Server running on port ${ENV.PORT}`));
