"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createWorkflow } from "@/lib/actions/create-workflow";

export const CreateWorkflowButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsPending(true);

    const result = await createWorkflow();

    if (result.error === "UNAUTHORIZED") {
      router.push("/login");
    }

    toast.success(result.message);

    setIsPending(false);
  };

  return (
    <Button onClick={handleClick} disabled={isPending}>
      Create workflow
    </Button>
  );
};
