import Task from "../models/Task.model"
import { Request, Response } from "express";

class TaskController {
    static async getOne(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const task = await Task.findOne({
                _id: id,
                createdBy: req.userId
            });

            if (!task) {
                return res.status(404).json({
                    message: "Task not found.",
                    success: false
                });
            }

            return res.status(200).json({
                message: "Task search completed successfully.",
                success: true,
                data: {
                    task
                }
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

    static async getAll(req: Request, res: Response) {
        try {
            const allTasks = await Task.find({
                createdBy: req.userId
            });

            return res.status(200).json({
                message: "Tasks search completed successfully.",
                success: true,
                data: {
                    tasks: allTasks
                }
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error.",
                success: false
            });
        }
    }

    static async create(req: Request, res: Response) {
        const { title, description, completionDate }: {
            title: string,
            description?: string,
            completionDate: string,
        } = req.body;

        try {
            const newTask = await Task.create({
                title,
                description,
                completionDate: new Date(completionDate),
                createdBy: req.userId
            });

            return res.status(201).json({
                message: "Task created successfully.",
                success: true,
                data: {
                    task: newTask
                }
            });
        } catch (error) {
            if (error instanceof Error && error.name == "ValidationError") {
                return res.status(400).json({
                    message: "Invalid data provided.",
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
        const id = req.params.id;
        const { title, description, completionDate, isCompleted }: {
            title?: string,
            description?: string,
            completionDate?: string,
            isCompleted?: boolean
        } = req.body;

        try {
            const taskUpdated = await Task.findOneAndUpdate({
                _id: id,
                createdBy: req.userId
            }, {
                title,
                description,
                completionDate: completionDate ? new Date(completionDate) : undefined,
                isCompleted
            }, {
                returnDocument: "after",
                runValidators: true
            });

            if (!taskUpdated) {
                return res.status(404).json({
                    message: "Task not found.",
                    success: false
                });
            }

            return res.status(200).json({
                message: "Task updated successfully.",
                success: true,
                data: {
                    task: taskUpdated
                }
            });
        } catch (error) {
            if (error instanceof Error && error.name == "ValidationError") {
                return res.status(400).json({
                    message: "Invalid data provided.",
                    success: false
                });
            }

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

    static async delete(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const taskDeleted = await Task.findOneAndDelete({
                _id: id,
                createdBy: req.userId
            });

            if (!taskDeleted) {
                return res.status(404).json({
                    message: "Task not found.",
                    success: false
                });
            }

            return res.status(200).json({
                message: "Task deleted successfully.",
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

export default TaskController;