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
import { INewUserSchema, newUserSchema } from "@/components/auth/auth.schema";
import SharedAuthUI from "@/components/auth/shared_auth_ui";
import { PasswordInput } from "@/components/extended-ui/password_input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/provider/AuthProvider";
import { useCustomLoader } from "@/components/functions/custom_loader";

const Page = () => {
  const router = useRouter();
  const { createUserWithEmailAndPassword } = useAuth();
  const { handlePromise, loading } = useCustomLoader();
  const form = useForm<INewUserSchema>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      role: "farmer",
    },
  });

  const onSubmit = (raw: INewUserSchema) => {
    handlePromise({
      func: async () => {
        await createUserWithEmailAndPassword(
          raw.email,
          raw.password,
          raw.displayName,
          "farmer"
        );
      },
      onSuccess: () => {
        router.push("/auth/login");
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="fx-c-c h-screen ">
        <SharedAuthUI
          title="Create an account"
          description="Create an account to access the dashboard"
          btnText="Register"
          secondaryBtn={{
            text: "I have an account",
            link: "/auth/login",
          }}
          loading={loading}
        >
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password" {...field} />
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
