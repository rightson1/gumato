// hooks/firebase/use_health_records.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { HealthRecordFormValues } from "@/lib/schemas/livestock";

export const useAddHealthRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      data: HealthRecordFormValues & {
        animalId: string;
      }
    ) => {
      await addDoc(collection(db, "healthRecords"), {
        ...data,
        createdAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "healthRecords",
      });
    },
  });
};

export const useDeleteHealthRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (recordId: string) => {
      await deleteDoc(doc(db, "healthRecords", recordId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "healthRecords",
      });
    },
  });
};

export const useGetHealthRecords = (animalId: string) => {
  return useQuery({
    queryKey: ["healthRecords", animalId],
    queryFn: async () => {
      const q = query(
        collection(db, "healthRecords"),
        where("animalId", "==", animalId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  });
};
