"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "@/components/ui/chart";

import { useGetTasks } from "@/hooks/firebase/use_tasks";
import {
  useGetLivestock,
  useGetLivestockByType,
} from "@/hooks/firebase/use_animal";
import { useAuth } from "@/components/provider/AuthProvider";

const Page = () => {
  const { user } = useAuth();
  const { data: livestock } = useGetLivestock({
    farmId: user?.uid,
  });
  const { data: cowData } = useGetLivestockByType("cow");
  const { data: tasks } = useGetTasks({
    userId: user?.uid!,
  });

  const animalDistribution = [
    {
      name: "Cows",
      count: livestock?.filter((a) => a.animal_type === "cow").length || 0,
    },
    {
      name: "Goats",
      count: livestock?.filter((a) => a.animal_type === "goat").length || 0,
    },
    {
      name: "Sheep",
      count: livestock?.filter((a) => a.animal_type === "sheep").length || 0,
    },
  ];

  const healthDistribution =
    livestock?.reduce((acc: any[], animal) => {
      const status = animal.healthStatus;
      const existingStatus = acc.find((item) => item.status === status);
      if (existingStatus) existingStatus.count++;
      else acc.push({ status, count: 1 });
      return acc;
    }, []) || [];

  const taskStatusData =
    tasks?.reduce((acc: any[], task) => {
      const status = task.status;
      const existingStatus = acc.find((item) => item.name === status);
      if (existingStatus) existingStatus.value++;
      else acc.push({ name: status, value: 1 });
      return acc;
    }, []) || [];

  return (
    <div className="min-h-screen pb-20 p-4 max-w-[500px] mx-auto">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Livestock Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                Cows: { label: "Cows", color: "hsl(var(--chart-1))" },
                Goats: { label: "Goats", color: "hsl(var(--chart-2))" },
                Sheep: { label: "Sheep", color: "hsl(var(--chart-3))" },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" aspect={1.5}>
                <PieChart>
                  <Pie
                    data={animalDistribution}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="40%"
                    fill="var(--color-Cows)"
                    label
                  >
                    {animalDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`var(--color-${entry.name})`}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip />
                  <ChartLegend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Count", color: "hsl(var(--chart-4))" },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" aspect={1.5}>
                <BarChart data={healthDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="status"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <ChartTooltip />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Value", color: "hsl(var(--chart-5))" },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" aspect={1.5}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="40%"
                    fill="var(--color-value)"
                    label
                  />
                  <ChartTooltip />
                  <ChartLegend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weight Distribution (Cows)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                weight: { label: "Weight", color: "hsl(var(--chart-6))" },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" aspect={1.5}>
                <AreaChart data={cowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <Area
                    type="monotone"
                    dataKey="weight"
                    fill="var(--color-weight)"
                    stroke="var(--color-weight)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
