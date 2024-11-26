"use client";
import { Home, PawPrint, ClipboardList, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const BottomNav = () => {
  const router = useRouter();
  const navItems = [
    {
      icon: <Home className="h-6 w-6" />,
      label: "Home",
      active: true,
      link: "/",
    },
    {
      icon: <PawPrint className="h-6 w-6" />,
      label: "Animals",
      link: "/animals",
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      label: "Tasks",
      link: "/tasks",
    },
    // { icon: <User className="h-6 w-6" />, label: "Profile", link: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0  border-t  flex justify-center">
      <div className="app-w w-full max-w-[500px] bg-white">
        <nav className="flex justify-around p-4">
          {navItems.map(({ icon, label, active, link }) => (
            <Button
              key={label}
              variant="ghost"
              className={`flex flex-col items-center gap-1 ${
                active ? "text-teal-800" : "text-gray-500"
              }`}
              onClick={() => router.push(link)}
            >
              {icon}
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
};
