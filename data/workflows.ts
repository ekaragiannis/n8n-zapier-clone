import { cache } from "react";
import { db } from "@/lib/db/drizzle";
import { requireAuth } from "./auth";

export const getWorkflows = cache(async () => {
  await requireAuth();

  return await db.query.workflow.findMany();
});
