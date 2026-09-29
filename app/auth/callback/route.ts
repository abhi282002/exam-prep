import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const authExchangeCode = requestUrl.searchParams.get("code");
  const targetNextUrl = requestUrl.searchParams.get("next") ?? "/exams";

  if (authExchangeCode) {
    const supabaseServerClient = await createSupabaseServerClient();
    await supabaseServerClient.auth.exchangeCodeForSession(authExchangeCode);
  }

  return NextResponse.redirect(new URL(targetNextUrl, request.url));
}
