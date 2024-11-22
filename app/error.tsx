"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center space-y-8">
        <div className="space-y-6">
          {/* Error SVG Illustration */}
          <svg
            className="w-40 h-40 mx-auto text-muted-foreground/50"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
              fill="currentColor"
            />
            <path
              d="M8.96967 8.96967C9.26256 8.67678 9.73744 8.67678 10.0303 8.96967L12 10.9393L13.9697 8.96967C14.2626 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0607 12L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L12 13.0607L10.0303 15.0303C9.73744 15.3232 9.26256 15.3232 8.96967 15.0303C8.67678 14.7374 8.67678 14.2626 8.96967 13.9697L10.9393 12L8.96967 10.0303C8.67678 9.73744 8.67678 9.26256 8.96967 8.96967Z"
              fill="currentColor"
            />
          </svg>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Something went wrong!
            </h1>
            <p className="text-muted-foreground max-w-[500px] mx-auto">
              {process.env.NODE_ENV === "development"
                ? error.message
                : "We're sorry, but there was an error processing your request."}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={reset} className="gap-2 group" variant="outline">
            <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180" />
            Try again
          </Button>

          <Button asChild className="gap-2">
            <Link href="/">
              <HomeIcon className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 text-left p-4 bg-muted rounded-lg overflow-auto max-w-xl mx-auto">
            <pre className="text-sm text-muted-foreground">{error.stack}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
