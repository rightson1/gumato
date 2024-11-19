"use client";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  IForgotPasswordSchema,
  forgotPasswordSchema,
} from "@/components/auth/auth.schema";
import SharedAuthUI from "@/components/auth/shared_auth_ui";
import { useAuth } from "@/components/provider/AuthProvider";
import { useCustomLoader } from "@/components/functions/custom_loader";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
const Page = () => {
  const router = useRouter();
  const { handlePromise, loading } = useCustomLoader();
  const form = useForm<IForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (raw: IForgotPasswordSchema) => {
    handlePromise({
      func: async () => {
        await sendPasswordResetEmail(auth, raw.email);
      },
      onSuccess: () => {
        router.push("/auth/login");
      },
      successText: "Password reset email sent",
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="fx-c-c h-screen ">
        <SharedAuthUI
          title="Forgot Password"
          description="Enter your email to reset your password, youll receive an email with instructions"
          btnText="Reset Password"
          secondaryBtn={{
            text: "Login?",
            link: "/auth/login",
          }}
          loading={loading}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="youremail@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </SharedAuthUI>
      </form>
    </Form>
  );
};

export default Page;
