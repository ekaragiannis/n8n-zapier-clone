"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { inngest } from "@/lib/inngest/client";

export const createWorkflow = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new Error("UNAUTHORIZED");
    }

    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "tkaragiannis@gmail.com",
      },
    });

    revalidatePath("/");

    return { success: true, message: "Job queued" };
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};
