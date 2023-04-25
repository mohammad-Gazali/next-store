import { User, createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";


export const revalidate = 30

export async function GET(req: Request, { params: { product_id } }: { params: {product_id: string} }) {

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE!
    )

    const { data: productReviewsResult } = await supabase
		.from("products-reviews")
		.select()
		.eq("product", product_id);


    const { data: usersResult } = await supabase.auth.admin.listUsers();

    const reviewsWithUserData = productReviewsResult?.map(review => {

        const user = usersResult.users.find(user => user.id === review.user) as User

        return {
            ...review,
            user: {
                name: user.user_metadata.full_name || user.user_metadata.user_name,
                email: user.email,
                avatar_url: user.user_metadata.avatar_url || user.user_metadata.picture
            }
        }
    })

    return NextResponse.json({
      productReviews: reviewsWithUserData
    })
}