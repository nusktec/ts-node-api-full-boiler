/**
 /Author: Revelation A.F
 /Git: nusktec
 **/
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {outJson} from "../utils/renders";

// Secret key (Ensure this is in your .env file)
const JWT_SECRET = process.env.JWT_SECRET || "n/a";

interface AuthRequest extends Request {
    auth?: any; // Add user data to the request object
}

export const authJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
       res.status(401).json(outJson(false, "No token provided", {}));
       return
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    try {
        const decoded = jwt.verify(token, JWT_SECRET!); // Verify token
        req.auth = decoded; // Attach decoded payload to request
        next(); // Move to the next middleware
    } catch (err) {
       res.status(403).json(outJson(false, "Forbidden: Invalid token", {}));
       return;
    }
};

export const roleCheckJWT = (requiredRoles: string = "", requiredPermissions: number[] = []) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const auth = req.auth
        if (!auth) {
            res.status(403).json(outJson(false, "Unauthorized: invalid user loads", {}));
            return
        }

        const { role, permission } = auth; // Extract role and permissions from user object

        // Check if user has a required role
        const hasRequiredRole = requiredRoles.includes(role) || requiredRoles.includes("user");
        // Check if user has ALL required permissions
        const hasRequiredPermissions = requiredPermissions.length === 0 || (Array.isArray(permission) && requiredPermissions.every(p => permission.includes(p)));

        // Allow access if user has a required role OR all required permissions
        if (hasRequiredRole && hasRequiredPermissions) {
            next(); // User has access, proceed
            return;
        }
        res.status(403).json(outJson(false, "Forbidden: Insufficient permissions", {}));
        return
    };
};
