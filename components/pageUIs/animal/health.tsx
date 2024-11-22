// components/animal/HealthRecords.tsx
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ActivitySquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  healthRecordSchema,
  type HealthRecordFormValues,
} from "@/lib/schemas/livestock";
import { useCustomLoader } from "@/components/functions/custom_loader";
import {
  useAddHealthRecord,
  useDeleteHealthRecord,
  useGetHealthRecords,
} from "@/hooks/firebase/use_health";

interface HealthRecordsProps {
  animalId: string;
}

export function HealthRecords({ animalId }: HealthRecordsProps) {
  const { data: records, isLoading } = useGetHealthRecords(animalId);
  const { mutateAsync: deleteRecord, ...deleting } = useDeleteHealthRecord();
  const { mutateAsync: addRecord, ...adding } = useAddHealthRecord();
  const { handlePromise, modalOpen, setModalOpen } = useCustomLoader();

  const form = useForm<HealthRecordFormValues>({
    resolver: zodResolver(healthRecordSchema),
    defaultValues: {
      condition: "",
      symptoms: "",
      startDate: "",
      status: "ongoing",
      treatment: "",
      doctorName: "",
    },
  });

  const onSubmit = (data: HealthRecordFormValues) => {
    handlePromise({
      func: async () => {
        await addRecord({ ...data, animalId });
      },
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      ongoing: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      chronic: "bg-purple-100 text-purple-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <ActivitySquare className="h-5 w-5" />
          <CardTitle className="text-lg">Health Records</CardTitle>
        </div>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 " />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw]   overflow-hidden md:max-w-[600px] rounded-md px-0">
            <DialogHeader>
              <DialogTitle>Add Health Record</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" 
    max-h-[70vh] rounded-md  flex flex-col  overflow-y-scroll p-4"
              >
                <div className="space-y-4 flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Condition*</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ongoing">Ongoing</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                              <SelectItem value="chronic">Chronic</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Symptoms*</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date*</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="treatment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Treatment*</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medication"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medication</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="doctorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Doctor Name*</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="doctorContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Doctor Contact</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter className="">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={adding.isPending}
                  >
                    {adding.isPending ? "Adding..." : "Add Health Record"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {records?.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No health records found
          </p>
        ) : (
          records?.map((record: any) => (
            <Card key={record.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{record.condition}</h3>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(record.status)}
                    >
                      {record.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {format(new Date(record.startDate), "MMM dd, yyyy")} -{" "}
                    {record.endDate
                      ? format(new Date(record.endDate), "MMM dd, yyyy")
                      : "Present"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handlePromise({
                      func: async () => await deleteRecord(record.id),
                    })
                  }
                  disabled={deleting.isPending}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Symptoms:</span>{" "}
                  {record.symptoms}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Treatment:</span>{" "}
                  {record.treatment}
                </p>
                {record.medication && (
                  <p className="text-sm">
                    <span className="font-medium">Medication:</span>{" "}
                    {record.medication}
                  </p>
                )}
                <p className="text-sm">
                  <span className="font-medium">Doctor:</span>{" "}
                  {record.doctorName}
                </p>
                {record.doctorContact && (
                  <p className="text-sm">
                    <span className="font-medium">Contact:</span>{" "}
                    {record.doctorContact}
                  </p>
                )}
                {record.notes && (
                  <p className="text-sm">
                    <span className="font-medium">Notes:</span> {record.notes}
                  </p>
                )}
              </div>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
}
