import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/monogo.config.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import short_url from "./src/routes/short_url.route.js";
import auth_routes from "./src/routes/auth.route.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";
import user_routes from "./src/routes/user.route.js";

dotenv.config("./.env");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000, () => {
  connectDB();
  console.log("server is running on http://localhost:3000");
});
