import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";


export const revalidate = 30

export async function GET(req: Request, { params: { product_id } }: { params: {product_id: string} }) {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  )

    const { data: productResult } = await supabase
		.from("products")
		.select()
		.eq("id", product_id)
		.gt("quantity", "0");

    if (!productResult) {
      return NextResponse.json({ product: null, productImages: null })
    }

    const { data: productImagesResult } = await supabase
		.from("products-images-table")
		.select()
		.eq("product", product_id);

    return NextResponse.json({
      product: productResult[0],
      productImages: productImagesResult
    })
}