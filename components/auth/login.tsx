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
import { ILoginSchema, loginSchema } from "@/components/auth/auth.schema";
import SharedAuthUI from "@/components/auth/shared_auth_ui";
import { PasswordInput } from "@/components/extended-ui/password_input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/provider/AuthProvider";
import { useCustomLoader } from "@/components/functions/custom_loader";

const LoginPageUI = () => {
  const router = useRouter();
  const { loginWithEmailAndPassword } = useAuth();
  const { handlePromise, loading } = useCustomLoader();
  let role = "";
  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (raw: ILoginSchema) => {
    handlePromise({
      func: async () => {
        const user = await loginWithEmailAndPassword(raw.email, raw.password);
        role = user.role;
      },
      onSuccess: () => {
        router.push("/");
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="fx-c-c h-screen ">
        <SharedAuthUI
          title="Login"
          description="Login to your account"
          btnText="Login"
          secondaryBtn={{
            text: "Forgot password?",
            link: "/auth/forgot-password",
          }}
          thirdBtn={{
            text: "Register",
            link: "/auth/new-farmer",
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

export default LoginPageUI;
