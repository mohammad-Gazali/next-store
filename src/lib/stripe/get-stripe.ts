import { Stripe, loadStripe } from "@stripe/stripe-js";



let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
    //? singleton design pattern
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    }
    return stripePromise
};

export default getStripe;