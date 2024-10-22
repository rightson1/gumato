import { BottomNav } from "@/components/layout/BottomNav";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pb-40">
      <DashboardHeader userName="Gumato" />
      <div>{children}</div>
      <BottomNav />
    </div>
  );
};

export default Layout;
