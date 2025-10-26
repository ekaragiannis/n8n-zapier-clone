import { requireAuth } from "@/data/auth";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  await requireAuth();

  const { id } = await params;

  return <p>Credential Id: {id}</p>;
}
