"use client";

import { FC, useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import AddReviewDialog from "./AddReviewDialog";
import { useToast } from "./ui/use-toast";



interface ProductDetailsActionsProps {
    product_id: string;
}

const ProductDetailsActions: FC<ProductDetailsActionsProps> = ({ product_id }) => {

	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const handleAddToCart = async () => {
		try {

			setIsLoading(true);

			const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cart/add`, {
				method: "POST",
				body: JSON.stringify({
					product_id
				}),
			});

			const data = await response.json();

			if (response.status == 200) {
				toast({
					title: "Success",
					description: data.message,
				})
			} else {
				toast({
					variant: "destructive",
					title: "Error",
					description: data.message,
				})
			}

			console.log(data)

		} catch (error) {

			toast({
				variant: "destructive",
				title: "Error",
				description: String(error),
			})

			console.log(error)

		} finally {
			
			setIsLoading(false);

		}
	};

	return (
		<>
			<AddReviewDialog product_id={product_id} />
			<Button isLoading={isLoading} onClick={handleAddToCart} variant="secondary" className="mt-4 gap-2 w-full text-base">
				Add To Cart {isLoading ? null : <ShoppingCart />}
			</Button>
		</>
	);
};

export default ProductDetailsActions;
