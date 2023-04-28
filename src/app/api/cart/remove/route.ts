import { Cart } from "@/types/db";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const supabase = createServerComponentSupabaseClient({
		cookies,
		headers,
	});

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

		const user_id = user.data.user.id;

		const product_id = body.product_id;

		// @ts-ignore
		const { data }: { data: Cart[] } = await supabase
			.from("cart")
			.select()
			.eq("user", user_id);

		const user_cart = data.at(-1);

		if (user_cart?.id) {
			if (user_cart.products.includes(product_id)) {
				
				await supabase
					.from("cart")
					.update({
						products: user_cart.products.filter(proudct => proudct !== product_id),
					})
					.eq("id", user_cart.id);

			} else {
                return NextResponse.json({
					message: "This product is not in the cart",
				}, { status: 400 });
			}
		} else {
			return NextResponse.json({
                message: "There is no cart"
            }, { status: 400 })
		}

		return NextResponse.json({
			message: "Product has been removed successfully",
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
