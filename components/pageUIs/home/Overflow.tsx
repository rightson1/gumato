import { Card, CardContent } from "@/components/ui/card";

export const Overview = () => {
  const stats = [
    { icon: "📊", label: "Categories", value: 9 },
    { icon: "🐄", label: "Total Animals", value: 9 },
    { icon: "📝", label: "Upcoming Tasks", value: 9 },
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
