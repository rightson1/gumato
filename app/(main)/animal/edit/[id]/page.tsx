"use client";
import NotFoundUI from "@/components/NotFoundUI";
import { EditAnimalPageUI } from "@/components/pageUIs/edit_animal/edit_animals";
import { useGetAnimal } from "@/hooks/firebase/use_animal";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const EditAnimal = () => {
  const params = useParams<{ id: string }>();

  const { data: animal, isLoading } = useGetAnimal(params.id, "cow");
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

  return <EditAnimalPageUI animal={animal} />;
};

export default EditAnimal;
