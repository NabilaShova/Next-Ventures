import { isClerkConfigured } from "@/lib/clerk-config";

export default async function SignInPage() {
  if (!isClerkConfigured()) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 bg-hero-gradient p-4 text-center">
        <h1 className="text-2xl font-semibold">Auth not configured</h1>
        <p className="max-w-md text-muted-foreground">
          Add your Clerk publishable and secret keys to <code>.env.local</code>{" "}
          to enable sign-in. Admin is accessible in local dev without auth.
        </p>
        <a href="/en/admin" className="text-primary underline-offset-4 hover:underline">
          Go to admin dashboard
        </a>
      </div>
    );
  }

  const { SignIn } = await import("@clerk/nextjs");

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-hero-gradient p-4">
      <SignIn forceRedirectUrl="/en/admin" />
    </div>
  );
}
