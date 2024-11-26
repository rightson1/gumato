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
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetTasks } from "@/hooks/firebase/use_tasks";
import {
  useGetLivestock,
  useGetLivestockByType,
} from "@/hooks/firebase/use_animal";
const Page = () => {
  const { data: livestock } = useGetLivestock();
  const { data: cowData } = useGetLivestockByType("cow");
  const { data: tasks } = useGetTasks();

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
    <div className="min-h-screen pb-20 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Livestock Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={animalDistribution}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={healthDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weight Distribution (Cows)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="weight" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
