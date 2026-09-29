import { redirect } from "next/navigation";
import { AuthContainer } from "@/components/auth/auth-container";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function SignUpPage() {
  const supabaseServerClient = await createSupabaseServerClient();
  const { data: { user: authenticatedUser } } = await supabaseServerClient.auth.getUser();

  if (authenticatedUser) {
    redirect("/exams");
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 text-neutral-900">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthContainer initialAuthenticationMode="signup" />
      </main>
      <SiteFooter />
    </div>
  );
}
