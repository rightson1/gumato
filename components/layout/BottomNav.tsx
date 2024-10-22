"use client";
import { Home, PawPrint, ClipboardList, Settings } from "lucide-react";
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
    { icon: <ClipboardList className="h-6 w-6" />, label: "Tasks", link: "/" },
    { icon: <Settings className="h-6 w-6" />, label: "Settings", link: "/" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
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
  );
};
