import { z } from "zod";
const BaseAnimalSchema = z.object({
  tagNumber: z.string().min(2, "Tag number must be at least 2 characters"),
  name: z.string().optional(),
  breed: z.string().min(2, "Breed must be specified"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  gender: z.enum(["male", "female"]),
  image: z.string().optional(),
  weight: z.number().min(0, "Weight must be a positive number"),
  color: z.string().min(2, "Color must be specified"),
  healthStatus: z.enum(["healthy", "sick", "under_treatment", "quarantined"]),
  purchaseDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .optional(),
  purchasePrice: z
    .number()
    .min(0, "Price must be a positive number")
    .optional(),
  source: z.string().min(2, "Source must be specified"),
  notes: z.string().optional(),
  vaccinations: z
    .array(
      z.object({
        name: z.string(),
        date: z.string(),
        nextDueDate: z.string(),
      })
    )
    .optional(),
});

// Specific schemas for each animal type
export const CowSchema = BaseAnimalSchema.extend({
  type: z.literal("cow"),
  milkingStatus: z.enum(["lactating", "dry", "not_applicable"]),
  lactationNumber: z.number().min(0).optional(),
  lastCalvingDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .optional(),
});

export const GoatSchema = BaseAnimalSchema.extend({
  type: z.literal("goat"),
  purpose: z.enum(["meat", "milk", "dual_purpose"]).optional(),
  kiddings: z.number().min(0).optional(),
});

export const SheepSchema = BaseAnimalSchema.extend({
  type: z.literal("sheep"),
  woolType: z.enum(["fine", "medium", "coarse"]).optional(),
  lastShearingDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .optional(),
});

export const DonkeySchema = BaseAnimalSchema.extend({
  type: z.literal("donkey"),
  workStatus: z.enum(["working", "resting", "retired"]).optional(),
  workloadCapacity: z.string().optional(),
});

export const PigSchema = BaseAnimalSchema.extend({
  type: z.literal("pig"),
  litterSize: z.number().min(0).optional(),
  feedingRegime: z.enum(["intensive", "semi_intensive", "free_range"]),
});

// Union type for all livestock
export const LivestockSchema = z.discriminatedUnion("type", [
  CowSchema,
  GoatSchema,
  SheepSchema,
  DonkeySchema,
  PigSchema,
]);
