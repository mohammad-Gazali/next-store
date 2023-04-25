import { reviewObject } from "@/lib/utils";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server";
import z from "zod";


export async function POST(req: Request) {

    const supabase = createServerComponentSupabaseClient({ cookies, headers });

    try {
        const user = await supabase.auth.getUser();
        
        if (!user.data.user?.id) {
            return NextResponse.json({
                message: "Forbidden"
            }, { status: 403 })
        }
        
        const body = await req.json();

        const newReviewData = reviewObject.parse(body)

        const newReviewResponse = await supabase.from("products-reviews").insert({
            ...newReviewData,
            user: user.data.user.id,
        })

        return NextResponse.json({
            review: newReviewResponse,
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                message: "Invalid Payload"
            }, { status: 400 })
        }
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}