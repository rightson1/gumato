"use client";
import React, { useDebugValue } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MoreVertical,
  ChevronLeft,
  CornerUpLeftIcon,
  Trash2,
  Pen,
} from "lucide-react";
import { format } from "date-fns";
import { useDeleteAnimal, useGetAnimal } from "@/hooks/firebase/use_animal";
import Link from "next/link";
import { VaccinationHistory } from "@/components/pageUIs/animal/vaccination";
import { HealthRecords } from "@/components/pageUIs/animal/health";
import { useCustomLoader } from "@/components/functions/custom_loader";
import NotFoundUI from "@/components/NotFoundUI";
import { EditAnimalPageUI } from "@/components/pageUIs/edit_animal/edit_animals";

const AnimalDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const { mutateAsync: deleteAnimal } = useDeleteAnimal();
  const { handlePromise, loading } = useCustomLoader();
  const { data: animal, isLoading } = useGetAnimal(params.id, "cow");
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!animal) {
    return (
      <NotFoundUI
        title="Animal not found"
        message="The animal you are looking for does not exist or has been deleted."
      />
    );
  }

  const getStatusColor = (status: string) => {
    const colors = {
      healthy: "bg-green-100 text-green-800",
      sick: "bg-red-100 text-red-800",
      under_treatment: "bg-yellow-100 text-yellow-800",
      quarantined: "bg-orange-100 text-orange-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-card -mt-5 ">
      <div className="bg-primary text-background npx  pb-2 gap-2 relative">
        <Button
          variant={"ghost"}
          asChild
          className="hover:bg-transparent  hover:text-background"
        >
          <Link href={"/"} className="">
            <CornerUpLeftIcon size={20} className="scale-150" />
          </Link>
        </Button>
        <div className="text-xl font-semibold w-full mb-tc">
          <h1 className="text-xl font-semibold ml-2">
            {animal.name || `${animal.animal_type} ${animal.tagNumber}`}
          </h1>
        </div>
        <div className="absolute pointer-events-none -left-5 -bottom-5 rounded-full bg-background/10 p-10"></div>
        <div className="absolute -right-0 -bottom-0 bg-background/10 px-5 py-7"></div>
      </div>

      <div className="p-4 space-y-6 max-w-3xl mx-auto">
        {animal.image && (
          <Card className="overflow-hidden shadow-md border-none">
            <CardContent className="p-0">
              <img
                src={animal.image}
                alt={`${animal.animal_type} ${animal.tagNumber}`}
                className="w-full h-72 object-cover"
              />
            </CardContent>
          </Card>
        )}

        {/* Primary Information */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-lg  ">Primary Information</CardTitle>
            <div className="fx gap-2">
              <Button
                className="text-destructive"
                variant={"outline"}
                size={"sm"}
                onClick={() => {
                  handlePromise({
                    func: async () => await deleteAnimal(params.id),
                    onSuccess: () => {
                      router.push("/");
                    },
                  });
                }}
              >
                <Trash2 size={14} />
              </Button>
              <Button
                className="text-destructive"
                variant={"outline"}
                size={"sm"}
              >
                <Link href={`/animal/edit/${params.id}`}>
                  <Pen size={14} />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Tag Number</span>
              <span className="font-medium">{animal.tagNumber}</span>
            </div>
            {animal.name && (
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">{animal.name}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Gender</span>
              <span className="font-medium capitalize">{animal.gender}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Breed</span>
              <span className="font-medium">{animal.breed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date of Birth</span>
              <span className="font-medium">
                {format(new Date(animal.dateOfBirth), "MMM dd, yyyy")}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Health and Physical Attributes */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg ">
              Health & Physical Attributes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Health Status</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  animal.healthStatus
                )}`}
              >
                {animal.healthStatus.replace(/_/g, " ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weight</span>
              <span className="font-medium">{animal.weight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Color</span>
              <span className="font-medium">{animal.color}</span>
            </div>
          </CardContent>
        </Card>
        <VaccinationHistory animalId={params.id} />
        <HealthRecords animalId={params.id} />
        {/* Acquisition Information */}
        {(animal.purchaseDate || animal.purchasePrice || animal.source) && (
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg ">
                Acquisition Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {animal.purchaseDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Date</span>
                  <span className="font-medium">
                    {format(new Date(animal.purchaseDate), "MMM dd, yyyy")}
                  </span>
                </div>
              )}
              {animal.purchasePrice && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Price</span>
                  <span className="font-medium">
                    Ksh {animal.purchasePrice.toLocaleString()}
                  </span>
                </div>
              )}
              {animal.source && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Source</span>
                  <span className="font-medium">{animal.source}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Animal Specific Information */}
        {animal.type === "cow" &&
          (animal.milkingStatus ||
            animal.lactationNumber ||
            animal.lastCalvingDate) && (
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg ">Milking Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {animal.milkingStatus && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Milking Status</span>
                    <span className="font-medium capitalize">
                      {animal.milkingStatus.replace(/_/g, " ")}
                    </span>
                  </div>
                )}
                {animal.lactationNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lactation Number</span>
                    <span className="font-medium">
                      {animal.lactationNumber}
                    </span>
                  </div>
                )}
                {animal.lastCalvingDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Calving Date</span>
                    <span className="font-medium">
                      {format(new Date(animal.lastCalvingDate), "MMM dd, yyyy")}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

        {animal.type === "goat" && animal.purpose && (
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg ">Goat Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <span className="text-gray-600">Purpose</span>
                <span className="font-medium capitalize">
                  {animal.purpose.replace(/_/g, " ")}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {animal.type === "sheep" &&
          (animal.woolType || animal.lastShearingDate) && (
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg ">Sheep Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {animal.woolType && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wool Type</span>
                    <span className="font-medium capitalize">
                      {animal.woolType}
                    </span>
                  </div>
                )}
                {animal.lastShearingDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Shearing Date</span>
                    <span className="font-medium">
                      {format(
                        new Date(animal.lastShearingDate),
                        "MMM dd, yyyy"
                      )}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

        {/* Parents Information */}
        {(animal.parents.sire || animal.parents.dam) && (
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg ">Parents Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {animal.parents.sire && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Sire</span>
                  <span className="font-medium">{animal.parents.sire}</span>
                </div>
              )}
              {animal.parents.dam && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Dam</span>
                  <span className="font-medium">{animal.parents.dam}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Additional Information */}
        {animal.notes && (
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg ">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{animal.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Animal Details</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-500">Edit form will be added here</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnimalDetailsPage;
