import { TaskDifficulty } from "./task-difficulty.enum";
import { Values } from "../../utils/types/utility-types/values";


export interface Task {
    id: number;
    createdDate: string;
    updatedDate: string;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
    userId: number;
    difficulty: Values<typeof TaskDifficulty>;
}
