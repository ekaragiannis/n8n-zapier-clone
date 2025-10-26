"use server";

import { inngest } from "../inngest/client";

export const testAI = async () => {
  try {
    await inngest.send({
      name: "execute/ai",
    });
    return { success: true, message: "Job queued" };
  } catch (error) {
    return {
      error: "Something went wrong processing the job",
    };
  }
};
