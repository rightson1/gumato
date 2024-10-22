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
export const DashboardHeader = ({ userName }: { userName: string }) => (
  <div className="p-4 bg-primary text-background w-full">
    <div className="flex justify-between items-center mb-4 w-full b">
      <div className="w-full fx-btw">
        <Image src="/logo.svg" width={40} height={40} alt="logo" />
        <ProfileCard userName={userName} />
      </div>
    </div>
  </div>
);

export const ProfileCard = ({ userName }: { userName: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarFallback className="bg-secondary font-semibold">
            {userName[0]}
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
            <span className="ts4 font-semibold ">Rightson Tole</span>
            <span className="ts6 text-faccent">chari.rightson@gmail.com</span>
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
          <Link href="/welcome">Sign Out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
