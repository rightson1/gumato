import { BottomNav } from "@/components/layout/BottomNav";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { FloatingActionButton } from "@/components/navigation/FloatingActionButton";
import { QuickActions } from "@/components/navigation/QuickActions";
import { LivestockList } from "@/components/pageUIs/home/LivestockList";
import { Overview } from "@/components/pageUIs/home/Overflow";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen pb-20 ">
      <QuickActions />
      <Overview />
      <LivestockList />
      <FloatingActionButton />
    </div>
  );
}
