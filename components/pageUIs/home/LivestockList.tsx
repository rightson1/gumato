import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export const LivestockList = () => {
  const livestock = [
    { type: "Cows", count: 5 },
    { type: "Goats", count: 4 },
  ];

  return (
    <section className="npx mt-8">
      <h2 className="text-xl font-semibold mb-4">Livestocks</h2>
      <div className="space-y-3">
        {livestock.map((animal) => (
          <Card key={animal.type} className="w-full">
            <CardHeader className="p-2">
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center "
              >
                <span>{animal.type}</span>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};
