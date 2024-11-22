// schemas/task.ts
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  status: z.enum(["pending", "in_progress", "completed", "cancelled"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  dueDate: z.string().min(1, "Due date is required"),
  assignedTo: z.string().optional(),
  userId: z.string(),
  category: z.enum([
    "feeding",
    "health_check",
    "maintenance",
    "milking",
    "other",
  ]),
  notes: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
//task with id
export interface ITask extends TaskFormValues {
  id: string;
}
