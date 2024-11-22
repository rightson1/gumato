import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { AnimalType } from "@/lib/shared_data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const LivestockList = () => {
  const livestock: {
    type: string;
    value?: AnimalType;
  }[] = [
    { type: "Cows", value: "cow" },
    { type: "Goats", value: "goat" },
    { type: "Sheep", value: "sheep" },
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
                asChild
                className="w-full flex justify-between items-center "
              >
                <Link href={`/animals/${animal.value}`}>
                  <span>{animal.type}</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};
