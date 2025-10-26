import { createGoogleGenerativeAI } from "@ai-sdk/google";
import * as Sentry from "@sentry/nextjs";
import { generateText } from "ai";
import { inngest } from "./client";

Sentry.logger.info("User triggered test log", { log_source: "sentry_test" });
const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction({ id: "execute" }, { event: "execute/ai" }, async ({ event, step }) => {
  Sentry.logger.info("User triggered test log", { log_source: "sentry_test" });
  const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
    system: "You are a helpful assistant",
    prompt: "What is 2+2?",
    model: google("gemini-2.5-flash"),
    experimental_telemetry: {
      isEnabled: true,
      recordInputs: true,
      recordOutputs: true,
    },
  });

  return steps;
});
