import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";



export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const res = NextResponse.next();

    const supabase = createMiddlewareSupabaseClient({ req, res });

    const { data: { session } } = await supabase.auth.getSession();

    if (pathname === "/" || (pathname === "/login" && session)) {
        return NextResponse.redirect(new URL("/client", req.url))
    }

    return res
}


export const config = {
    matcher: ['/', '/login'],
}