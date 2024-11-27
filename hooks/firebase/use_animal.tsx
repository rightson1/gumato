import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { BaseAnimal, Cow, Goat, Sheep } from "@/lib/schemas/livestock";
import { AnimalType } from "@/lib/shared_data";
//export number of livestock
export const useGetLivestock = ({ farmId }: { farmId?: string }) => {
  return useQuery<BaseAnimal[]>({
    queryKey: ["livestock"],
    queryFn: async () => {
      // const querySnapshot = await getDocs(collection(db, "livestock"));
      // const data = querySnapshot.docs.map((doc) => doc.data() as BaseAnimal);
      // return data;
      const querySnapshot = await getDocs(
        query(collection(db, "livestock"), where("farmId", "==", farmId))
      );
      const data = querySnapshot.docs.map((doc) => doc.data() as BaseAnimal);
      return data || [];
    },
    enabled: !!farmId,
  });
};

//livestock by animal_type
export const useGetLivestockByType = (animal_type: AnimalType) => {
  return useQuery<(BaseAnimal & { id: string })[]>({
    queryKey: ["livestock", animal_type],
    queryFn: async () => {
      const querySnapshot = await getDocs(
        query(
          collection(db, "livestock"),
          where("animal_type", "==", animal_type)
        )
      );
      const data = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as BaseAnimal),
        id: doc.id,
      }));
      return data;
    },
  });
};
//animal by id
export const useGetAnimal = (id: string, animal_type: AnimalType) => {
  type AnimalTypeMap = {
    cow: Cow;
    goat: Goat;
    sheep: Sheep;
  };

  return useQuery<AnimalTypeMap[typeof animal_type] & { id: string }>({
    queryKey: ["livestock", id],
    queryFn: async () => {
      const docSnap = await getDoc(doc(db, "livestock", id));
      return {
        ...(docSnap.data() as AnimalTypeMap[typeof animal_type]),
        id: docSnap.id,
      };
    },
  });
};

//delete animal
export const useDeleteAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, "livestock", id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["livestock"],
      });
    },
  });
};

/// update animal
export const useUpdateAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BaseAnimal & { id: string }) => {
      await setDoc(doc(db, "livestock", data.id), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["livestock"],
      });
    },
  });
};
