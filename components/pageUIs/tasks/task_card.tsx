// components/tasks/TaskCard.tsx
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TaskFormValues } from "@/lib/schemas/tasks";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { EditTaskModal } from "./edit_task";

interface TaskCardProps {
  task: TaskFormValues & { id: string };
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const getPriorityColor = (priority: string) =>
    ({
      urgent: "bg-red-100 text-red-800",
      high: "bg-orange-100 text-orange-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    }[priority]);

  const getStatusColor = (status: string) =>
    ({
      pending: "bg-gray-100 text-gray-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }[status]);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="font-semibold">{task.title}</h3>
          <div className="flex gap-2">
            <Badge
              variant="secondary"
              className={getPriorityColor(task.priority)}
            >
              {task.priority}
            </Badge>
            <Badge variant="secondary" className={getStatusColor(task.status)}>
              {task.status.replace("_", " ")}
            </Badge>
            <Badge variant="outline">{task.category.replace("_", " ")}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <EditTaskModal task={task} />
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{task.description}</p>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}</p>
        {task.assignedTo && <p>Assigned to: {task.assignedTo}</p>}
      </div>
    </Card>
  );
}
