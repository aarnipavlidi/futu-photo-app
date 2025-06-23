import { Suspense } from "react";
import { Progress } from "@/components/ui/progress";
import HomePage from "@/components/HomePage";

export default function Page() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-background/80">
        <div className="w-full max-w-xl px-8">
          <Progress value={50} />
        </div>
      </div>
    }>
      <HomePage />
    </Suspense>
  );
};