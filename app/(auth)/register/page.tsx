import { RegisterForm } from "@/app/features/auth/components/register-form";
import { requireUnauth } from "@/data/auth";

export default async function Page() {
  await requireUnauth();
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
