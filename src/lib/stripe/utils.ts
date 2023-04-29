import { ProductWithMainImage } from "@/types/db";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
});

export function createStripeProduct(product: ProductWithMainImage) {
    return {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(product.price) * 100,
          product_data: {
            name: product.name,
            description: product.description
          },
        },
    };    
}

export async function createStripeSession(stripeShapeProducts: ReturnType<typeof createStripeProduct>[], redirectURL: string) {

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: stripeShapeProducts,
        mode: "payment",
        success_url: `${redirectURL}/success`,
        cancel_url: `${redirectURL}/cancel`
    })

    return session.id;
}