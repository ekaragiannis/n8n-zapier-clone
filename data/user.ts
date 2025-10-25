import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/lib/db/drizzle";
import { account } from "@/lib/db/schema";
import { requireAuth } from "./auth";

export const getAccounts = cache(async () => {
  const session = await requireAuth();
  return await db.select().from(account).where(eq(account.userId, session.user.id));
});
