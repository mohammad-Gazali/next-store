"use client";

import { FC } from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import AddReviewDialog from "./AddReviewDialog";



interface ProductDetailsActionsProps {
    product_id: string;
}

const ProductDetailsActions: FC<ProductDetailsActionsProps> = ({ product_id }) => {
	return (
		<>
			<AddReviewDialog product_id={product_id} />
			<Button variant="secondary" className="mt-4 gap-2 w-full text-base">
				Add To Cart <ShoppingCart />
			</Button>
		</>
	);
};

export default ProductDetailsActions;
