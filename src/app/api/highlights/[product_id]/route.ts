import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";


export const revalidate = 30

export async function GET(req: Request, { params: { product_id } }: { params: {product_id: string} }) {

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE!
    )

    const { data: productHighlightsResult } = await supabase
		.from("products-highlights")
		.select()
		.eq("product", product_id);

    const productHighlights = productHighlightsResult?.map(highlight => highlight.text)

    return NextResponse.json({
        productHighlights
    })
}