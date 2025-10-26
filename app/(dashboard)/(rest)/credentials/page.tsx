import { requireAuth } from "@/data/auth";

export default async function Page() {
  await requireAuth();

  return <p>Credentials</p>;
}
