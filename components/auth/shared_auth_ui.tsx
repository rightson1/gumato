import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const SharedAuthUI = ({
  title,
  description,
  children,
  btnText,
  secondaryBtn,
  loading,
  thirdBtn,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  btnText: string;
  secondaryBtn?: {
    text: string;
    link: string;
  };
  thirdBtn?: {
    text: string;
    link: string;
  };
  loading?: boolean;
}) => {
  return (
    <div className=" fx justify-center md:pt-14">
      <Card className="shadow-none border-none">
        <CardHeader className="fx-c-c flex-col gap-4">
          <div className="fx fx-col gap-3 justify-center items-center">
            <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="fx fx-col gap-3">{children}</CardContent>
        <CardFooter className="fx fx-col gap-3 w-full ">
          <Button type="submit" className="w-full" disabled={loading}>
            <div className="flex items-center justify-center gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {btnText}
            </div>
          </Button>
          <div className="fx-c-c">
            {secondaryBtn && (
              <Button variant={"ghost"} asChild className="w-full">
                <Link
                  href={secondaryBtn.link}
                  className="text-primary font-semibold"
                >
                  {secondaryBtn.text}
                </Link>
              </Button>
            )}
            {thirdBtn && (
              <Button variant={"ghost"} asChild className="w-full">
                <Link
                  href={thirdBtn.link}
                  className="text-primary font-semibold"
                >
                  {thirdBtn.text}
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SharedAuthUI;
