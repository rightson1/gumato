// components/animal/VaccinationHistory.tsx
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useToast } from "@/hooks/use-toast";
import {
  useAddVaccination,
  useDeleteVaccination,
  useGetVaccinations,
} from "@/hooks/firebase/use_vacinations";
import { useCustomLoader } from "@/components/functions/custom_loader";

const vaccinationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  date: z.string().min(1, "Date is required"),
  nextDueDate: z.string().min(1, "Next due date is required"),
});

export type VaccinationFormValues = z.infer<typeof vaccinationSchema>;

interface VaccinationHistoryProps {
  animalId: string;
}

export function VaccinationHistory({ animalId }: VaccinationHistoryProps) {
  const { data: vaccinations, isLoading } = useGetVaccinations(animalId);
  const { mutateAsync: deleteVaccination, ...deleting } =
    useDeleteVaccination();
  const { mutateAsync: addVaccination, ...adding } = useAddVaccination();
  const form = useForm<VaccinationFormValues>({
    resolver: zodResolver(vaccinationSchema),
    defaultValues: {
      name: "",
      date: "",
      nextDueDate: "",
    },
  });
  const { handlePromise, modalOpen, setModalOpen } = useCustomLoader();

  // Add vaccination

  const onSubmit = (data: VaccinationFormValues) => {
    handlePromise({
      func: async () => {
        const d = {
          ...data,
          animalId,
        };
        await addVaccination(d);
      },
    });
  };

  const deleteVaccinationHandler = (vaccinationId: string) => {
    handlePromise({
      func: async () => {
        await deleteVaccination(vaccinationId);
      },
    });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Vaccination History</CardTitle>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 " />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] rounded-md">
            <DialogHeader>
              <DialogTitle>Add New Vaccination</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vaccination Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nextDueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Next Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={adding.isPending}
                >
                  {adding.isPending ? "Adding..." : "Add Vaccination"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {vaccinations?.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No vaccination records found
          </p>
        ) : (
          vaccinations?.map((vaccination: any) => (
            <div
              key={vaccination.id}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div className="space-y-1">
                <p className="font-medium">{vaccination.name}</p>
                <div className="text-sm text-muted-foreground">
                  <p>
                    Date: {format(new Date(vaccination.date), "MMM dd, yyyy")}
                  </p>
                  <p>
                    Next Due:{" "}
                    {format(new Date(vaccination.nextDueDate), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteVaccinationHandler(vaccination.id)}
                disabled={deleting.isPending}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
