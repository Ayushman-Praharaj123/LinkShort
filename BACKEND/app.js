import express, { json } from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./SRC/mongo.config.js";
import short_url from "./SRC/Routes/shorturl.routes.js";
import auth_routes from "./SRC/Routes/auth.routes.js";
import { redirectFromShortUrl } from "./SRC/controller/short_url.controller.js";
import { errorHandler } from "./SRC/utils/errorhandler.js";
import cors from "cors";
import { attachUser } from "./SRC/utils/attachUser.js";
import cookieParser from "cookie-parser";
dotenv.config("./.env");
const app = express();
app.use(cors({
    origin: "https://link-short-yoururlshortner.vercel.app/", // Your frontend URL (correct port) at the time of hosting you should change this url to your frontend url
    credentials: true ,
}));
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);
app.use("/api/create",short_url);
app.use("/api/auth",auth_routes);
app.get("/:id", redirectFromShortUrl);
app.use(errorHandler);
app.listen(3000, () => {
    connectDB();
    console.log("Server is running on http://localhost:3000");
});
