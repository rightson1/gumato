import { z } from "zod";
//email passowrd
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type ILoginSchema = z.infer<typeof loginSchema>;
//new user with email and password
export const newUserSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.optional(z.enum(["farmer", "vet"])),
    displayName: z.string().min(1),
  })
  .refine((data) => {
    //trim the email and password
    data.email = data.email.trim();
    data.password = data.password.trim();
    return true;
  });

export type INewUserSchema = z.infer<typeof newUserSchema>;

//forgot password
export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type IForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

//otp
export const otpSchema = z.object({
  otp: z.string().min(4),
});
export type IOtpSchema = z.infer<typeof otpSchema>;
