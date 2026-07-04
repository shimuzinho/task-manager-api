import Task from "../models/Task.model"
import { Request, Response } from "express";

interface CreateTaskBody {
    title: string,
    description?: string,
    completionDate: string
}

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
        const { title, description, completionDate }: CreateTaskBody = req.body;

        if (!title || !completionDate) {
            return res.status(400).json({
                message: "Title and Completion Date are required.",
                success: false,
            });
        }

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