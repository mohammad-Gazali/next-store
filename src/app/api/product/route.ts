import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";


export const revalidate = 30;

export async function GET(req: Request) {

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE!
    )

    const { data: dataProducts } = await supabase.from("products").select().gt('quantity', '0');

	const { data: dataImages } = await supabase
		.from("products-images-table ")
		.select();

    return NextResponse.json({
        dataProducts,
        dataImages
    })
}