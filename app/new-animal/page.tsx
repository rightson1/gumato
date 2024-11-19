"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, CornerUpLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { page_links } from "@/lib/shared_data";
import Link from "next/link";

const animalTypes = [
  {
    id: "cow",
    title: "Cow",
    description: "Add a new cow to you farm",
  },
  {
    id: "goat",
    title: "Goat",
    description: "Add a goat",
  },
  {
    id: "sheep",
    title: "Sheep",
    description: "Add a sheep",
  },
  {
    id: "donkey",
    title: "Donkeys",
    description: "Add A New donkey",
  },
  {
    id: "pig",
    title: "Pigs",
    description: "Add a pig",
  },
];

export default function AddAnimalType() {
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (selectedAnimal) {
      // Navigate to specific animal form
      router.push(`/new-animal/${selectedAnimal}`);
    }
  };

  return (
    <div className="min-h-screen pb-20 ">
      {/* Header */}
      <div className="bg-teal-800 text-background npx py-2 pt-7  gap-2 relative">
        <Button
          variant={"ghost"}
          asChild
          className="hover:bg-transparent  hover:text-background"
        >
          <Link href={"/"} className="">
            <CornerUpLeftIcon size={20} className="scale-150" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold w-full mb-tc">Add Animal</h1>
        <div className="absolute pointer-events-none -left-5 -bottom-5 rounded-full bg-background/10 p-10"></div>
        <div className="absolute -right-0 -bottom-0 bg-background/10 px-5 py-7"></div>
      </div>

      {/* Animal Selection */}
      <div className="p-4">
        <RadioGroup
          value={selectedAnimal}
          onValueChange={setSelectedAnimal}
          className="space-y-3"
        >
          {animalTypes.map((animal) => (
            <Card
              key={animal.id}
              className={`relative flex items-center space-x-2 p-4 cursor-pointer transition-all ${
                selectedAnimal === animal.id
                  ? "border-2 border-teal-800"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedAnimal(animal.id)}
            >
              <RadioGroupItem
                value={animal.id}
                id={animal.id}
                className="absolute left-4 text-teal-800"
              />
              <div className="pl-8">
                <p className="font-medium">{animal.title}</p>
                <p className="text-sm text-gray-500">{animal.description}</p>
              </div>
            </Card>
          ))}
        </RadioGroup>
      </div>

      {/* Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button
          className="w-full bg-teal-800 hover:bg-teal-700 text-white"
          onClick={handleSubmit}
          disabled={!selectedAnimal}
        >
          Lets Go
        </Button>
      </div>
    </div>
  );
}
