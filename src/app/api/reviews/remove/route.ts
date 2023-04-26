import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	
	const supabase = createServerComponentSupabaseClient({ cookies, headers });

	try {
		const user = await supabase.auth.getUser();

		if (!user.data.user?.id) {
			return NextResponse.json(
				{
					message: "Forbidden",
				},
				{ status: 403 }
			);
		}

		const body = await req.json();

        if (!body.id) {
            return NextResponse.json(
				{
					message: "Invalid Payload",
				},
				{ status: 400 }
			);
        }

		const reviewID = parseInt(body.id);

		const newReviewResponse = await supabase
			.from("products-reviews")
			.delete()
			.eq("id", reviewID);

		return NextResponse.json({
			review: newReviewResponse,
		});
        
	} catch (error) {
		return NextResponse.json(
			{
				message: "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}
