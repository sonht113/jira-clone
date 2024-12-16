"use client";

import { Button } from "@/components/ui/button";
import { paths } from "@/constants";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2 h-screen">
      <AlertTriangle className="size-5 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Something went wrong</p>
      <Button variant="secondary" size="sm" asChild>
        <Link href={paths.HOME}>Back to Home</Link>
      </Button>
    </div>
  );
}
