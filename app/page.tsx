import { Button } from "@/components/ui/button";
import { db } from "@/lib/db/drizzle";

export default async function Page() {
  const users = await db.query.user.findMany();

  return (
    <div>
      {users.map((u) => (
        <p key={u.id}>{u.name}</p>
      ))}
      <Button>Click me</Button>
    </div>
  );
}
