import User, { IUser } from "../models/User.model";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";

class UserController {
    static async getOne(req: Request, res: Response) {
        const id = req.userId;

        try {
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: "User not found.",
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
                    message: "Invalid ID format.",
                    success: false
                });
            }

            return res.status(500).json({
                message: "Internal server error.",
                success: false
            });
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password }: {
            email: string,
            password: string
        } = req.body;

        try {
            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return res.status(404).json({
                    message: "User not found.",
                    success: false
                });
            }

            const isPasswordCorrect = await bcryptjs.compare(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(401).json({
                    message: "Incorrect password.",
                    success: false
                });
            }

            const token = sign({ id: user.id }, process.env.SECRET_KEY!, { expiresIn: "2h" });
            return res.status(200).json({
                message: "Login successful.",
                success: true,
                data: token
            });
        } catch (error) {
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
                message: "User registered successfully.",
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

    static async update(req: Request, res: Response) {
        const id = req.userId;
        const { avatar, username, email }: {
            avatar?: string,
            username?: string,
            email?: string
        } = req.body;

        try {
            const updatedUser = await User.findOneAndUpdate({
                _id: id
            }, {
                avatar,
                username,
                email,
            }, {
                returnDocument: "after",
                runValidators: true
            });

            if (!updatedUser) {
                return res.status(404).json({
                    message: "User not found.",
                    success: false
                });
            }

            return res.status(200).json({
                message: "User updated successfully.",
                success: true,
                data: updatedUser
            });
        } catch (error) {
            if (error instanceof Error && error.name == "CastError") {
                return res.status(400).json({
                    message: "Invalid ID format.",
                    success: false
                });
            }

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

    static async delete(req: Request, res: Response) {
        const id = req.userId;

        try {
            const deletedUser = await User.findByIdAndDelete(id);

            if (!deletedUser) {
                return res.status(404).json({
                    message: "User not found.",
                    success: false
                });
            }

            return res.status(200).json({
                message: "User deleted successfully.",
                success: true
            });
        } catch (error) {
            if (error instanceof Error && error.name == "CastError") {
                return res.status(400).json({
                    message: "Invalid ID format.",
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