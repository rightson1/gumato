"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useAuth } from "../provider/AuthProvider";

export const QuickActions = () => {
  const { user } = useAuth();
  const router = useRouter();
  const actions: {
    id: string;
    label: string;
    icon: string;
    onClick: () => void;
  }[] = [
    {
      id: "animals",
      label: "Animals",
      icon: "🐮",
      onClick: () => {
        router.push("/animals");
      },
    },
    {
      id: "activities",
      label: "Activities",
      icon: "📋",
      onClick: () => {
        router.push("/tasks");
      },
    },
    {
      id: "chat",
      label: "Chat",
      icon: "✨",
      onClick: () => {
        router.push("/chat");
      },
    },
  ];

  return (
    <div>
      <div className="bg-primary npx pb-8">
        <h1 className="ts1 font-semibold text-background fx--c gap-1">
          <span className="opacity-85">Hello</span>
          <span>{user?.displayName}</span>
        </h1>
        <p className="text-background">
          <span className="opacity-75">What would you like to do today?</span>
        </p>
      </div>
      <div className="flex justify-between gap-4 npx  -mt-6">
        {actions.map((item) => (
          <Card
            key={item?.id}
            onClick={item?.onClick}
            className="flex-1  text-center bg-white/80 backdrop-blur-sm"
          >
            <Button
              variant="ghost"
              className="w-full h-full flex flex-col gap-2"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm text-gray-600">{item.label}</span>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
