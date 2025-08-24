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
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();

// Security middlewares
app.use(helmet());
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

// CORS: allow only known frontends
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

// Routes
app.use("/api/create", short_url);
app.use("/api", short_url);
app.use("/api/auth", auth_routes);
app.get("/:id", redirectFromShortUrl);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`🚀 Server running on port ${PORT}`);
});
