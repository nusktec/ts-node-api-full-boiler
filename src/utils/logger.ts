import config from "../config/config";

/**
 /Author: Revelation A.F
 /Git: nusktec
 **/
// utils/logger.ts

import process from "process";

const con = config[process.env.NODE_ENV!];

import {createLogger, format, transports} from 'winston';
import 'winston-mongodb';

const logger2 = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.errors({stack: true}),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.MongoDB({
            level: 'info',
            db: con.mongo_uri,
            collection: 'server_logs',
            tryReconnect: true,
            format: format.combine(format.timestamp(), format.json())
        }),
    ],
    exitOnError: false,
});

export default logger2;
