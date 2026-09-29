import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { verifyUserIsAdmin } from "@/lib/admin-auth";
import { AdminHeader } from "@/components/admin/admin-header";
import { SiteFooter } from "@/components/footer/site-footer";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabaseServerClient = await createSupabaseServerClient();
  const { data: { user: currentUser } } = await supabaseServerClient.auth.getUser();

  if (!currentUser) {
    redirect("/login?redirect=/admin");
  }

  const isAuthorized = await verifyUserIsAdmin(currentUser.id, currentUser.email);
  if (!isAuthorized) {
    redirect("/?error=unauthorized_admin_access");
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 text-neutral-900">
      <AdminHeader userEmailAddress={currentUser.email ?? ""} />
      <main className="flex-1 py-8">{children}</main>
      <SiteFooter />
    </div>
  );
}
