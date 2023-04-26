import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const supabase = createServerComponentSupabaseClient({ cookies, headers });

	try {
		const { data } = await supabase
			.from("products-images-table")
			.select()
			.eq("is_main", true)
			.eq("is_featured", true);

        return NextResponse.json({
            featuredImages: data
        })
            
	} catch (error) {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}
