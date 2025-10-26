import { CreateWorkflowButton } from "@/app/create-workflow-button";
import { Logout } from "@/app/features/auth/components/logout";
import { requireAuth } from "@/data/auth";
import { getWorkflows } from "@/data/workflows";
import { TestAIButton } from "./test-ai-button";

export default async function Page() {
  await requireAuth();

  const workflows = await getWorkflows();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      <div>{JSON.stringify(workflows)}</div>
      <CreateWorkflowButton />
      <TestAIButton />
      <Logout />
    </div>
  );
}
