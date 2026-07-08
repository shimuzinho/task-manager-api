import { Schema, Types, model } from "mongoose";

interface ITask {
    title: string;
    description?: string;
    completionDate: Date;
    isCompleted: boolean;
    createdBy: Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: "",
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
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

const Task = model<ITask>("Task", taskSchema);
export default Task;