import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let initialResponse = NextResponse.next({ request });
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "placeholder-publishable-key";

  const supabaseClient = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        initialResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => initialResponse.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user: authenticatedUser } } = await supabaseClient.auth.getUser();
  const requestedPath = request.nextUrl.pathname;
  const isAuthRoute = requestedPath === "/login" || requestedPath === "/signup";
  const isProtectedRoute = requestedPath.startsWith("/test") || requestedPath.startsWith("/admin");

  if (authenticatedUser && isAuthRoute) {
    return NextResponse.redirect(new URL("/exams", request.url));
  }

  if (!authenticatedUser && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", requestedPath);
    return NextResponse.redirect(loginUrl);
  }

  return initialResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
