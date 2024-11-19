"use client";
import { BottomNav } from "@/components/layout/BottomNav";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { useAuth } from "@/components/provider/AuthProvider";
import { LoadingUI } from "@/components/shared/loadingUI";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { userIdentity, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!userIdentity) {
      router.push("/welcome");
    }
  }, [userIdentity, user]);

  if (!user) {
    return <LoadingUI />;
  }
  return (
    <div className="">
      <DashboardHeader />
      <div>{children}</div>
      <BottomNav />
    </div>
  );
};

export default Layout;
