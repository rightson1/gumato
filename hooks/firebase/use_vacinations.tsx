import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { VaccinationFormValues } from "@/components/pageUIs/animal/vaccination";
// const addVaccination = useMutation({
//   mutationFn: async (data: VaccinationFormValues) => {
//     await addDoc(collection(db, "vaccinations"), {
//       ...data,
//       animalId,
//       createdAt: new Date().toISOString(),
//     });
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries(["vaccinations", animalId]);
//     setIsOpen(false);
//     form.reset();
//     toast({
//       title: "Success",
//       description: "Vaccination record added successfully",
//     });
//   },
// });

// // Delete vaccination
// const deleteVaccination = useMutation({
//   mutationFn: async (vaccinationId: string) => {
//     await deleteDoc(doc(db, "vaccinations", vaccinationId));
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries(["vaccinations", animalId]);
//     toast({
//       title: "Success",
//       description: "Vaccination record deleted successfully",
//     });
//   },
// });

export const useAddVaccination = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      data: VaccinationFormValues & {
        animalId: string;
      }
    ) => {
      await addDoc(collection(db, "vaccinations"), {
        ...data,

        createdAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === "vaccinations";
        },
      });
    },
  });
};

export const useDeleteVaccination = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vaccinationId: string) => {
      await deleteDoc(doc(db, "vaccinations", vaccinationId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === "vaccinations";
        },
      });
    },
  });
};

export const useGetVaccinations = (animalId: string) => {
  return useQuery({
    queryKey: ["vaccinations", animalId],
    queryFn: async () => {
      const q = query(
        collection(db, "vaccinations"),
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
