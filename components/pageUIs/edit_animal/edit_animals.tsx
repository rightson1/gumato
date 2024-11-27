"use client";
import { CornerUpLeftIcon, Loader2, MoreVertical } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React, { useState } from "react";
import Link from "next/link";
import { AnimalType, page_links } from "@/lib/shared_data";
import { Livestock, LivestockSchema } from "@/lib/schemas/livestock";
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
import { useAuth } from "@/components/provider/AuthProvider";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
type FormValues = z.infer<typeof LivestockSchema>;
interface ILivestockContext {
  form: UseFormReturn<FormValues>;
}
const LivestockContext = React.createContext<ILivestockContext | null>(null);
export const EditAnimalPageUI: React.FC<{
  animal: Livestock;
}> = ({ animal }) => {
  const params = useParams<{ animal: AnimalType }>();
  const animalType = params.animal;
  const { handlePromise, loading } = useCustomLoader();
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(LivestockSchema),
    criteriaMode: "all",
    defaultValues: {
      ...animal,
    },
  });
  const {
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormValues) => {
    const uploadAnimal = async () => {
      const file = form.getValues("image");
      let image = "";
      if (file && typeof file !== "string") {
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
      successText: "Animal Edited successfully",
    });
  };

  return (
    <LivestockContext.Provider value={{ form }}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full overflow-y-scroll"
        >
          <div className="bg-primary text-background npx py-2 pt-7  gap-2 relative">
            <Link
              href={page_links.new_animal}
              className="text-white hover:bg-teal-700"
            >
              <span>
                <CornerUpLeftIcon size={20} />
              </span>
            </Link>
            <h1 className="text-xl font-semibold w-full mb-tc capitalize">
              Edit {animal.name}
            </h1>
            <div className="absolute pointer-events-none  -left-5 -bottom-5 rounded-full bg-background/10 p-10"></div>
            <div className="absolute -right-0 -bottom-0 bg-background/10 px-5 py-7"></div>
          </div>

          <div className=" py-6 space-y-5">
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
            <div className="sticky bottom-0 p-6 bg-background border-t">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </LivestockContext.Provider>
  );
};

export const useEditLivestockForm = () => {
  const context = React.useContext(LivestockContext);
  if (!context) {
    throw new Error("useLivestockForm must be used within a LivestockForm");
  }
  return context;
};
