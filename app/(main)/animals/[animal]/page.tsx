"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Search, ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";
import { AnimalType } from "@/lib/shared_data";
import { useParams } from "next/navigation";
import {
  useGetLivestock,
  useGetLivestockByType,
} from "@/hooks/firebase/use_animal";

interface Animal {
  id: AnimalType;
  name: string;
  count: number;
  image: string;
}

const animals: Animal[] = [
  {
    id: "cow",
    name: "Cows",
    count: 10,
    image: "/imgs/cow.jpg",
  },
  {
    id: "goat",
    name: "Goat",
    count: 10,
    image: "/imgs/goat.jpg",
  },
  {
    id: "sheep",
    name: "Sheep",
    count: 10,
    image: "/imgs/sheep.jpg",
  },
];

export default function AnimalsPage() {
  const params = useParams<{
    animal: AnimalType;
  }>();
  const { data: livestock } = useGetLivestockByType(params.animal);
  return (
    <div className="min-h-screen ">
      <div className="px-4 pb-6 bg-primary fx-col gap-2">
        <div className="fx-c-c text-background capitalize">
          <h1 className="ts1 font-semibold">
            {animals.find((animal) => animal.id == params.animal)?.name}
          </h1>
        </div>
      </div>

      <div className="px-4 space-y-4 pb-6 mt-5">
        {livestock?.map((animal, index) => (
          <Card key={index} className="p-4">
            <Link href={`/animal/${animal.id}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={animal.image || `/imgs/${params.animal}.jpg`}
                    alt={animal.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{animal.name}</h3>
                    <p className="text-gray-600">
                      {/* {
                        livestock?.filter(
                          (item) => item.animal_type == animal.id
                        ).length
                      }{" "}
                      cows */}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className=" ">
                  View
                </Button>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
