import { Schema, model } from "mongoose";

interface ITask {
    title: string;
    description?: string;
    completionDate: Date;
    isCompleted: boolean;
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        completionDate: {
            type: Date,
            required: true
        },
        isCompleted: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Task = model<ITask>("Task", taskSchema);
export default Task;