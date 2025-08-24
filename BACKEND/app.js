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
// CORS: allow only known frontends
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow non-browser clients (Postman) and same-origin requests with no Origin header
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);
app.use("/api/create", short_url);
app.use("/api", short_url); // For /api/urls endpoints
app.use("/api/auth", auth_routes);
app.get("/:id", redirectFromShortUrl);
app.use(errorHandler);
app.listen(3000, () => {
    connectDB();
    console.log("Server is running on http://localhost:3000");
});
