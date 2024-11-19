import React from "react";
import { Toaster } from "sonner";

const Client = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default Client;
