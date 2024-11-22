"use client";
import { Card, CardContent } from "@/components/ui/card";
import { animal_types } from "@/lib/shared_data";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useGetLivestock } from "@/hooks/firebase/use_animal";
import { useGetTasks } from "@/hooks/firebase/use_tasks";

export const Overview = () => {
  const { data: livestock } = useGetLivestock();
  const { data: tasks } = useGetTasks();
  const stats = [
    { icon: "📊", label: "Categories", value: animal_types.length },
    { icon: "🐄", label: "Total Animals", value: livestock?.length || 0 },
    {
      icon: "📝",
      label: "Upcoming Tasks",
      value:
        tasks?.filter((task) => {
          task.status === "pending";
        }).length || 0,
    },
    { icon: "🔔", label: "Notifications", value: 0 },
  ];

  return (
    <section className="mt-8">
      <div className="npx">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};
const StatsCard = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: number;
}) => (
  <Card className="flex-1">
    <CardContent className="p-6 flex flex-col items-center gap-2">
      <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="text-2xl font-bold">{value}</span>
    </CardContent>
  </Card>
);
