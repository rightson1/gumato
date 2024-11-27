import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditLivestockForm } from "../edit_animals";

export const AdditionalInfo = () => {
  const { form } = useEditLivestockForm();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue("image", file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          {/* Image Upload */}
          <div className="space-y-4">
            <FormLabel>Image</FormLabel>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </label>
              {imagePreview && (
                <div className="relative h-24 w-24">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      form.setValue("image", undefined);
                    }}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-1"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter additional notes..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Parents Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="parents.sire"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sire (Father)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter sire's tag number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parents.dam"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dam (Mother)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter dam's tag number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
