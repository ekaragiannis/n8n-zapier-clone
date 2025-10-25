import { LoginForm } from "@/app/features/auth/components/login-form";
import { requireUnauth } from "@/data/auth";

export default async function Page() {
  await requireUnauth();

  return (
    <div>
      <LoginForm />
    </div>
  );
}
