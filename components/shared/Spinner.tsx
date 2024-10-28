import React from "react";
import { Loader2 } from "lucide-react";

export const Spin = ({
  fullScreen = false,
  text = "Loading...",
  size = 24,
}) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 min-h-[100px]">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin text-primary" size={size} />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
};
