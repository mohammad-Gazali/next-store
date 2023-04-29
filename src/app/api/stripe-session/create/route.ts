import { createStripeProduct, createStripeSession } from "@/lib/stripe/utils";
import { ProductWithMainImage } from "@/types/db";
import { NextResponse } from "next/server";



export async function POST(req: Request) {

    const { products }: { products: ProductWithMainImage[] } = await req.json();

    const stripeShapeProducts = products.map(createStripeProduct);

    const stripeSessionId = await createStripeSession(stripeShapeProducts, `${process.env.NEXT_PUBLIC_SITE_URL}/purchase`);

    return NextResponse.json({
        id: stripeSessionId
    })
}