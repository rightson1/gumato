"use client";
import { CornerUpLeftIcon, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React, { useState } from "react";
import Link from "next/link";
import { AnimalType, page_links } from "@/lib/shared_data";
import { LivestockSchema } from "@/lib/schemas/livestock";
import { useCustomLoader } from "@/components/functions/custom_loader";
import { type PutBlobResult } from "@vercel/blob";
import { ErrorMessage } from "@hookform/error-message";
import { upload } from "@vercel/blob/client";
import {
  AdditionalInfo,
  AquisitionInfo,
  CowFields,
  GoatFields,
  HealthFields,
  PrimaryInfo,
  SheepFields,
} from "./inputs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
type FormValues = z.infer<typeof LivestockSchema>;
interface ILivestockContext {
  form: UseFormReturn<FormValues>;
}
const LivestockContext = React.createContext<ILivestockContext | null>(null);
export const NewAnimalPageUI: React.FC = () => {
  const params = useParams<{ animal: AnimalType }>();
  const animalType = params.animal;
  const { handlePromise, loading } = useCustomLoader();
  const form = useForm<FormValues>({
    resolver: zodResolver(LivestockSchema),
    criteriaMode: "all",
    defaultValues: {
      animal_type: animalType,
      breed: "",
      color: "",
      dateOfBirth: "",
      weight: 0,
      gender: "male",
      healthStatus: "healthy",
      milkingStatus: "not_applicable",
      name: "",
      notes: "",
      purchaseDate: "",
      purchasePrice: 0,
      source: "",
      tagNumber: "",
      type: animalType,
      woolType: "medium",
      lastCalvingDate: "",
      lactationNumber: 0,
      parents: { sire: "", dam: "" },
      lastShearingDate: "",
    },
  });
  const {
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormValues) => {
    const uploadAnimal = async () => {
      const file = form.getValues("image");
      let image = "";
      if (file) {
        const { url } = await upload(
          new Date().getTime().toString(),

          file,
          {
            access: "public",
            handleUploadUrl: "/api/upload",
          }
        );
        image = url;
      }
      await setDoc(doc(db, "livestock", data.tagNumber), {
        ...data,
        image,
      });
    };
    handlePromise({
      func: async () => await uploadAnimal(),
      successText: "Animal added successfully",
    });
  };

  return (
    <LivestockContext.Provider value={{ form }}>
      <div className="">
        <div className="bg-teal-800 text-background npx py-2 pt-7  gap-2 relative">
          <Link
            href={page_links.new_animal}
            className="text-white hover:bg-teal-700"
          >
            <span>
              <CornerUpLeftIcon size={20} />
            </span>
          </Link>
          <h1 className="text-xl font-semibold w-full mb-tc capitalize">
            Add {animalType}
          </h1>
          <div className="absolute pointer-events-none  -left-5 -bottom-5 rounded-full bg-background/10 p-10"></div>
          <div className="absolute -right-0 -bottom-0 bg-background/10 px-5 py-7"></div>
        </div>

        <div className="npx py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <PrimaryInfo />
              <HealthFields />
              <AquisitionInfo />
              <AdditionalInfo />
              {animalType === "cow" && <CowFields />}
              {animalType === "goat" && <GoatFields />}
              {animalType === "sheep" && <SheepFields />}
              <ErrorMessage
                errors={errors}
                name="multipleErrorInput"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              />
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                onClick={() => {
                  console.log({
                    errors,
                  });
                }}
              >
                <span className="flex items-center gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Saving..." : "Save Animal"}
                </span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </LivestockContext.Provider>
  );
};

export const useLivestockForm = () => {
  const context = React.useContext(LivestockContext);
  if (!context) {
    throw new Error("useLivestockForm must be used within a LivestockForm");
  }
  return context;
};
