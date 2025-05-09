/**
 Author: Revelation.AF
 Git: nusktec
 **/
import * as process from "process";
import dotenv from "dotenv";

dotenv.config({path: [".env.dev"]});

import path from "path"
import cors from "cors"
import cookieParser from "cookie-parser"
import logger from "morgan"
import logger2 from "./utils/logger";
import express from 'express';
import sequelize from './config/database';
import RedisClient from './config/database-redis'
import MongoDB from "./config/database-mongodb";
import {catchError, error404, errorHandler} from "./middlewares/errorHandler";
import {friendlyOrigin} from "./allowOrigins";
//routes classes
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import webRoutes from './routes/webRoutes';
import mobileRoutes from './routes/mobileRoutes';
import commonRoutes from './routes/commonRoutes';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Origin settings
const allowedOrigins = friendlyOrigin;
app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//establish threads engine
(async () => {
    if (process.env.USE_DB_REDIS) {
        await RedisClient.connect()
    }
})()

//set api version
const API_VERSION = process.env.API_VERSION

// Routes
app.use(`/`, commonRoutes)
app.use(`/api/v${API_VERSION}/auth`, authRoutes);
app.use(`/api/v${API_VERSION}/admin`, adminRoutes);
app.use(`/api/v${API_VERSION}/user`, userRoutes);
app.use(`/api/v${API_VERSION}/mobile`, mobileRoutes);
app.use(`/api/v${API_VERSION}/web`, webRoutes);
// End of routes

//allow logger on mongo_db
if(process.env.USE_UTILS_LOGGER && process.env.USE_DB_MONGO){
    app.use((req, res, next) => {
        if(req.method!=="GET"){
            logger2.info({
                path: `Incoming request: ${req.method} ${req.url}`,
                body: JSON.stringify(req.body),
                params: req.query,
                headers: req.headers,
            });
        }
        next();
    });
}

// Centralized error-handling middleware
app.use(error404);
app.use(catchError);
app.use(errorHandler);

//declare port
const PORT = process.env.PORT || 5000;
//try server engine start
try {
    // Sync database and start server
    (async () => {
        //sync db
        if (process.env.USE_DB_MYSQL) {
            await sequelize.sync()
        }
        if (process.env.USE_DB_MONGO) {
            await MongoDB()
        }
        //logs success
        console.log(`✅ All dependencies sync...`);
        app.listen(PORT, () => console.log(`⚠️Server running on port ${PORT}`));
    })().then(async () => {
    })
} catch (err: any) {
    //re-throttle the applications
    console.error(err);
}
