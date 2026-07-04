import Task from "../models/Task.model"
import { Request, Response } from "express";

class TaskController {
    static async getOne(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const task = await Task.findById(id);

            if (!task) {
                return res.status(404).json({
                    message: "There is no task with that ID.",
                    success: false
                });
            }

            return res.status(200).json({
                message: "Task search completed successfully.",
                success: true,
                data: task
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
            const allTasks = await Task.find();

            return res.status(200).json({
                message: "Tasks search completed successfully.",
                success: true,
                data: allTasks
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
            completionDate: string
        } = req.body;

        try {
            const newTask = await Task.create({
                title,
                description,
                completionDate: new Date(completionDate)
            });

            return res.status(201).json({
                message: "Task created successfully.",
                success: true,
                data: newTask
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
            const taskUpdated = await Task.findByIdAndUpdate(id, {
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
                    message: "There is no task with that ID.",
                    success: false
                });
            }

            return res.status(200).json({
                message: "Task updated successfully.",
                success: true,
                data: taskUpdated
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
            const taskDeleted = await Task.findByIdAndDelete(id);

            if (taskDeleted == null) {
                return res.status(404).json({
                    message: "There is no task with that ID.",
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