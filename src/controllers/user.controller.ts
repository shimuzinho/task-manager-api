import User, { IUser } from "../models/User.model";
import { Request, Response } from "express";

class UserController {
    static async getOne(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: "There is no user with that ID.",
                    success: false
                });
            }

            return res.status(200).json({
                message: "User search completed successfully.",
                success: true,
                data: user
            });
        } catch (error) {
            if (error instanceof Error && error.name == "CastError") {
                return res.status(400).json({
                    message: "Invalid Id format.",
                    success: false
                });
            }

            return res.status(500).json({
                message: "Internal server error.",
                success: false
            });
        }
    }

    static async register(req: Request, res: Response) {
        const { username, email, password }: {
            username: string,
            email: string,
            password: string
        } = req.body;

        try {
            const newUser = await User.create({
                username,
                email,
                password
            });

            let tempUser = newUser.toObject() as Partial<IUser>;
            delete tempUser.password;

            return res.status(201).json({
                message: "User registred successfully.",
                success: true,
                data: tempUser
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