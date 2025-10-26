"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { testAI } from "@/lib/actions/test-ai";

export const TestAIButton = () => {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);
    const result = await testAI();
    if (result.error) {
      toast.error(result.error);
    }
    setIsPending(false);
  };

  return (
    <Button disabled={isPending} onClick={handleClick}>
      Test AI
    </Button>
  );
};
