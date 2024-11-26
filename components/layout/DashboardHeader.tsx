import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useAuth } from "../provider/AuthProvider";
import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Window {
    deferredPrompt: BeforeInstallPromptEvent;
  }
}
export const DashboardHeader = () => (
  <div className="p-4 bg-primary text-background w-full">
    <div className="flex justify-between items-center mb-4 w-full b">
      <div className="w-full fx-btw">
        <Link href={"/"}>
          <Image src="/logo.svg" width={40} height={40} alt="logo" />
        </Link>
        <ProfileCard />
      </div>
    </div>
  </div>
);

export const ProfileCard = () => {
  const { user, logout } = useAuth();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      console.log("beforeinstallprompt event captured");
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if app is already installed
    window.matchMedia("(display-mode: standalone)").matches &&
      setIsInstallable(false);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      console.log(`User choice: ${outcome}`);

      if (outcome === "accepted") {
        setIsInstallable(false);
        console.log("PWA installed successfully");
      }
    } catch (error) {
      console.error("Install error:", error);
    }

    setDeferredPrompt(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarFallback className="bg-secondary font-semibold">
            {user?.displayName
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        className="mr-3 md:mr-10 p-4 bg-background"
      >
        <div className="fx--c gap-2 py-1">
          <img
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="h-8 w-8 rounded-full"
            width={100}
            height={100}
          />
          <div className="fx-col">
            <span className="ts4 font-semibold ">{user?.displayName}</span>
            <span className="ts6 text-faccent">{user?.email}</span>
          </div>
        </div>
        <Separator />

        <DropdownMenuItem
          onClick={async () => {
            await logout();
          }}
        >
          Sign Out
        </DropdownMenuItem>

        {/* download pwa  is not downloaded */}
        {isInstallable && (
          <DropdownMenuItem asChild>
            <button
              type="button"
              onClick={handleInstall}
              className="w-full flex items-center px-2 py-1.5 text-sm cursor-pointer"
            >
              Install App
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
