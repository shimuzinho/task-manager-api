import User from "../models/User.model";
import { Request, Response } from "express";

class UserController {
    static async register(req: Request, res: Response) {
        const { username, email, password } = req.body;

        try {
            const newUser = await User.create({
                username,
                email,
                password
            });

            return res.status(201).json({
                message: "User registred successfully.",
                success: true,
                data: newUser
            });
        } catch (error) {
            if (error instanceof Error && error.name == "ValidationError") {
                return res.status(400).json({
                    message: "Invalid data provided.",
                    success: false
                });
            }

            if (error instanceof Error && "code" in error && error.code == 11000) {
                return res.status(409).json({
                    message: "Username or Email already registered.",
                    success: false
                });
            }
            
            return res.status(500).json({
                message: "Internal server error.",
                success: false
            });
        }
    }
}

export default UserController;