"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Search, ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";

interface Animal {
  id: string;
  name: string;
  count: number;
  image: string;
}

const animals: Animal[] = [
  {
    id: "1",
    name: "Cows",
    count: 10,
    image: "/imgs/cow.jpg",
  },
  {
    id: "2",
    name: "Sheep",
    count: 10,
    image: "/imgs/sheep.jpg",
  },
  {
    id: "3",
    name: "Camel",
    count: 10,
    image: "/imgs/camel.jpg",
  },
  {
    id: "4",
    name: "Pigs",
    count: 10,
    image: "/imgs/pig.jpg",
  },
];

export default function AnimalsPage() {
  return (
    <div className="min-h-screen ">
      <div className="px-4 pb-6 bg-primary fx-col gap-2">
        <div className="fx-btw text-background">
          <h1 className="ts2">Cows</h1>
          <Filter className="h-6 w-6" />
        </div>
        <div className="relative">
          <Search className="absolute left-3  h-4 w-4 text-gray-400 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search Animals"
            className="pl-9 bg-white focus-visible:ring-transparent border-none h-12 placeholder:text-base
               "
          />
        </div>
      </div>

      <div className="px-4 space-y-4 pb-6 mt-5">
        {animals.map((animal) => (
          <Card key={animal.id} className="p-4">
            <Link href={`/animals/${animal.id}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{animal.name}</h3>
                    <p className="text-gray-600">{animal.count} cows</p>
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
