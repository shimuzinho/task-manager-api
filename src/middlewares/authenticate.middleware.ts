import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({
            message: "Token not provided.",
            success: false
        });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY!, (error, payload) => {
        if (error) {
            return res.status(401).json({
                message: "Invalid token.",
                success: false
            });
        }

        if (typeof payload == "object") {
            req.userId = payload.id;
            next();
        } else {
            return res.status(401).json({
                message: "Invalid token.",
                success: false
            })
        }
    });
}

export default authenticate;