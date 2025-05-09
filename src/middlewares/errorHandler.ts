/**
 Author: Revelation.AF
 Engine: [//]
 Git: nusktec
 **/

import { Request, Response, NextFunction } from 'express';
import process from "process";
import {outJson} from "../utils/renders";

// Custom error interface
interface AppError extends Error {
    statusCode?: number;
}

// Centralized error handling middleware
const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.message);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json(outJson(false, message, [process.env.NODE_ENV === 'production' ? null : err.stack]))
};

const catchError = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json(outJson(false, message, [process.env.NODE_ENV === 'production' ? null : err.stack]))
}

// Catch-all route for handling 404 Not Found
const error404 = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json(outJson(false, "Resource not found", null));
};

export {errorHandler, catchError, error404};
