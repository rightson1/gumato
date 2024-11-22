import { z } from "zod";
const BaseAnimalSchema = z.object({
  // Primary Information (Required)
  tagNumber: z.string().min(2, "Tag number must be at least 2 characters"),
  name: z.string().optional(),
  gender: z.enum(["male", "female"]),
  breed: z.string().min(2, "Breed must be specified"),
  dateOfBirth: z.string(),

  // Health and Physical Attributes
  weight: z.number().min(0, "Weight must be a positive number"),
  color: z.string().min(2, "Color must be specified"),
  healthStatus: z.enum(["healthy", "sick", "under_treatment", "quarantined"]),

  // Acquisition Information
  purchaseDate: z.string().optional(),
  purchasePrice: z
    .number()
    .min(0, "Price must be a positive number")
    .optional(),
  source: z.string().min(2, "Source must be specified"),
  animal_type: z.enum(["cow", "goat", "sheep"]),

  // Additional Information
  image: z.instanceof(File).optional(),
  notes: z.string().optional(),
  parents: z.object({
    sire: z.string().optional(),
    dam: z.string().optional(),
  }),
});

// Specific schemas for each animal type
export const CowSchema = BaseAnimalSchema.extend({
  type: z.literal("cow"),
  milkingStatus: z.enum(["lactating", "dry", "not_applicable"]).optional(),
  lactationNumber: z.number().min(0).optional(),
  lastCalvingDate: z.string().optional(),
});

export const GoatSchema = BaseAnimalSchema.extend({
  type: z.literal("goat"),
  purpose: z.enum(["meat", "milk", "dual_purpose"]).optional(),
});

export const SheepSchema = BaseAnimalSchema.extend({
  type: z.literal("sheep"),
  woolType: z.enum(["fine", "medium", "coarse"]).optional(),
  lastShearingDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .optional(),
});

export const LivestockSchema = z.discriminatedUnion("type", [
  CowSchema,
  GoatSchema,
  SheepSchema,
]);

type BaseAnimal = Omit<z.infer<typeof BaseAnimalSchema>, "image"> & {
  image?: string;
};

// Inferred specific animal types
type Cow = Omit<z.infer<typeof CowSchema>, "image"> & {
  image?: string;
};

type Goat = Omit<z.infer<typeof GoatSchema>, "image"> & {
  image?: string;
};

type Sheep = Omit<z.infer<typeof SheepSchema>, "image"> & {
  image?: string;
};

// Combined livestock type
type Livestock = Cow | Goat | Sheep;

export type { BaseAnimal, Cow, Goat, Sheep, Livestock };

export const healthRecordSchema = z.object({
  condition: z.string().min(2, "Condition must be at least 2 characters"),
  symptoms: z.string().min(2, "Symptoms must be at least 2 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  status: z.enum(["ongoing", "resolved", "chronic"]),
  treatment: z.string().min(2, "Treatment details required"),
  medication: z.string().optional(),
  doctorName: z.string().min(2, "Doctor name required"),
  doctorContact: z.string().optional(),
  notes: z.string().optional(),
});

export type HealthRecordFormValues = z.infer<typeof healthRecordSchema>;
