import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireAuth = cache(async () => {
  console.log("requireAuth");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
});

export const requireUnauth = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return session;
});
