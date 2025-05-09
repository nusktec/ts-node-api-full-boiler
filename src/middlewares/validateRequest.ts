/**
 Author: Revelation.AF
 Git: nusktec
 **/
import {check, validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';
import {outJson} from "../utils/renders";

//validation on login
export const validateLoginRequest = [
    check('email')
        .isEmail()
        .withMessage('Enter a valid email'),

    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),

    // Middleware to handle validation result
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(outJson(false, `Validation error. '${errors.array()[0].msg}'`, null, errors.array()))
            return //you must return error to avoid next route visit
        }
        next();  // Move to the next middleware or route handler if no errors
    }
];

//validation on squad
export const validatePasswordResetRequest = [
    check("email").isEmail().withMessage("Enter a valid email"),
    // Middleware to handle validation result
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(outJson(false, `Validation error: '${errors.array()[0].msg}'`, null, errors.array() ));
            return; // Prevents further execution
        }
        next();  // Move to the next middleware or route handler if no errors
    }
];