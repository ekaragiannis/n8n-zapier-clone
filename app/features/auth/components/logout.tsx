"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const Logout = () => {
  const router = useRouter();

  const handleClick = async () => {
    await authClient.signOut(
      {},
      {
        onSuccess: () => {
          router.push("/login");
        },
      },
    );
  };

  return <Button onClick={handleClick}>Logout</Button>;
};
