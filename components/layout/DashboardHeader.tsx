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
  const { user } = useAuth();
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
        <DropdownMenuItem>
          <Link href="#">Profile and Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="#">Events And Tickets</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="#">Hosts Dashboards</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="/auth/login">Sign Out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
