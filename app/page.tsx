import { requireAuth } from "@/data/auth";
import { getAccounts } from "@/data/user";

export default async function Page() {
  await requireAuth();
  const accounts = await getAccounts();
  return <div className="min-h-screen min-w-screen flex items-center justify-center">{JSON.stringify(accounts)}</div>;
}
