// hooks/firebase/use_tasks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ITask, TaskFormValues } from "@/lib/schemas/tasks";

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TaskFormValues) => {
      await addDoc(collection(db, "tasks"), {
        ...data,
        createdAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<TaskFormValues>;
    }) => {
      await updateDoc(doc(db, "tasks", id), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, "tasks", id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useGetTasks = ({ userId }: { userId: string }) => {
  return useQuery<ITask[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "tasks"), where("userId", "==", userId))
      );
      const data = querySnapshot.docs.map((doc) => doc.data() as ITask);
      return data || [];
    },
  });
};
