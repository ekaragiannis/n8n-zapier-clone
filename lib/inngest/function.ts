import { db } from "../db/drizzle";
import { workflow } from "../db/schema";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("fetching-video", "5s");

    // Transcribing
    await step.sleep("transcribing", "5s");

    // Sending trnscription to AI
    await step.sleep("sending-to-ai", "5s");

    // Insert worrkflow
    await step.run("crete-workflow", () => {
      return db.insert(workflow).values({
        name: "workflow-from-inngest",
      });
    });
  },
);
