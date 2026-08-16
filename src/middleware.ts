import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const userMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );

        // You can access the decoded user information later
        (req as any).user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};