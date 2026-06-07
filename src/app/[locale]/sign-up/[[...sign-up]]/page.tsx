import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-hero-gradient p-4">
      <SignUp forceRedirectUrl="/admin" />
    </div>
  );
}
