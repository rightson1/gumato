import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { page_links } from "@/lib/shared_data";

export const FloatingActionButton = () => (
  <Button
    asChild
    className="fixed bottom-20 right-6 h-14 w-14 rounded-full bg-teal-800 hover:bg-teal-700"
  >
    <Link href={page_links.new_animal}>
      <Plus className="h-6 w-6" />
    </Link>
  </Button>
);
