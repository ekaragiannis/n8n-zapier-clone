import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted flex items-center min-h-svh flex-col justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <Image alt="App logo" src="logos/logo.svg" height={30} width={30} />
          N8N & Zapier Clone
        </Link>
        {children}
      </div>
    </div>
  );
}
