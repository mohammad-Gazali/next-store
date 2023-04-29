"use client";

import { FC, useState } from "react";
import { Button } from "./ui/button";
import { ProductWithMainImage } from "@/types/db";
import getStripe from "@/lib/stripe/get-stripe";
import { useToast } from "./ui/use-toast";



interface CheckoutButtonProps {
    products: ProductWithMainImage[];
}

const CheckoutButton: FC<CheckoutButtonProps> = ({ products }) => {

    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();

    const handleCheckoutClick = async () => {
        
        setIsLoading(true);
        
        try {
        
            const stripe = await getStripe();

            const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe-session/create`, {
                method: "POST",
                body: JSON.stringify({
                    products                    
                })
            });

            const checkoutSession = await response.json();

            const result = await stripe!.redirectToCheckout({
                sessionId: checkoutSession.id,
            });

            if (result.error) {
                toast({
					variant: "destructive",
					title: "Error",
					description: result.error.message,
				})
            }

        } catch (error) {
            
            console.log(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: String(error),
            })

        } finally {

            setIsLoading(false);
            
        }
    }

	return (
		<Button
			variant="secondary"
            size="lg"
            className="w-full max-w-lg self-center mt-6"
            onClick={handleCheckoutClick}
            isLoading={isLoading}
		>
			Checkout
		</Button>
	);
};

export default CheckoutButton;
