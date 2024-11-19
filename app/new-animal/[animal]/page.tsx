"use client";
import {
  ArrowLeft,
  CornerUpLeftIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { AnimalType, page_links } from "@/lib/shared_data";
import { LivestockSchema } from "@/lib/schemas/livestock";
import { uploadFile } from "@/components/shared/functions/uploadFile";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useCustomLoader } from "@/components/functions/custom_loader";
import { Textarea } from "@/components/ui/textarea";

type FormValues = z.infer<typeof LivestockSchema>;
const LivestockForm: React.FC = () => {
  const params = useParams<{ animal: AnimalType }>();
  const [animalType, setAnimalType] = useState<AnimalType>(params.animal);
  const { handlePromise } = useCustomLoader();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(LivestockSchema),
    defaultValues: {
      vaccinations: [],
      breed: "",
      color: "",
      dateOfBirth: "",
      feedingRegime: "intensive",
      gender: "male",
      healthStatus: "healthy",
      image: "",
      milkingStatus: "not_applicable",
      name: "",
      notes: "",
      purchaseDate: "",
      purchasePrice: 0,
      source: "",
      tagNumber: "",
      type: animalType,
      weight: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "vaccinations",
  });
  console.log(form.formState.errors);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = async (data: FormValues) => {
    let url = "";
    console.log(data);
    handlePromise({
      func: async () => {
        url = image ? await uploadFile(image, data.tagNumber) : "";
        data.image = url;
        const docRef = doc(db, "livestock", data.tagNumber);
        await setDoc(docRef, data);
        form.reset();
        setImagePreview(null);
        setLoading(false);
      },
    });
  };
  //console.log(form.formState.errors);
  useEffect(() => {}, [form.formState.isDirty]);
  return (
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
            {/* Animal Type Selection */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Animal Type</FormLabel>
                  <Select
                    onValueChange={(
                      value: "cow" | "goat" | "sheep" | "donkey" | "pig"
                    ) => {
                      field.onChange(value);
                      setAnimalType(value);
                    }}
                    value={animalType}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select animal type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cow">Cow</SelectItem>
                      <SelectItem value="goat">Goat</SelectItem>
                      <SelectItem value="sheep">Sheep</SelectItem>
                      <SelectItem value="donkey">Donkey</SelectItem>
                      <SelectItem value="pig">Pig</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Base Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="tagNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag Number*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tag number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="breed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Breed*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter breed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender*</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)*</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter weight"
                        {...field}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="healthStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health Status*</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="healthy">Healthy</SelectItem>
                        <SelectItem value="sick">Sick</SelectItem>
                        <SelectItem value="under_treatment">
                          Under Treatment
                        </SelectItem>
                        <SelectItem value="quarantined">Quarantined</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purchaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purchasePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Price*</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter source" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter notes (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Conditional Fields based on animal type */}
            {animalType === "cow" && (
              <FormField
                control={form.control}
                name="milkingStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Milking Status</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="lactating">Lactating</SelectItem>
                        <SelectItem value="dry">Dry</SelectItem>
                        <SelectItem value="not_applicable">
                          Not Applicable
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Vaccinations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Vaccinations</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({ name: "", date: "", nextDueDate: "" })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vaccination
                </Button>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <FormField
                    control={form.control}
                    name={`vaccinations.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Image Upload */}
            {/* <div className="space-y-4">
              <FormLabel>Image</FormLabel>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Upload className="h-4 w-4" />
                  Upload Image
                </label>
                {imagePreview && (
                  <div className="relative h-24 w-24">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        form.setValue("image", "");
                        setImage(null);
                      }}
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div> */}

            <Button type="submit" className="w-full" disabled={loading}>
              <span className="flex items-center gap-2">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Saving..." : "Save Animal"}
              </span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LivestockForm;
