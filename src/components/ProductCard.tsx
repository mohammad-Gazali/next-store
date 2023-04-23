import { ProductWithImages } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { Info, MoreHorizontal } from "lucide-react";



const ProductCard = ({ product }: { product: ProductWithImages }) => {

    const mainImage = product.images.filter(image => image.is_main)[0]

	return (
		<div className="group relative flex flex-col bg-primary-foreground border shadow-lg rounded-xl w-80">
			{mainImage ? (
                <Image
				    className="w-full h-72 rounded-t-xl object-cover"
				    src={mainImage.image_url}
				    alt={product.name}
                    width={100}
                    height={100}
		    	/>
            ) : null}
			<div className="flex flex-wrap items-center justify-between p-4 md:p-5">
				<h3 className="text-lg">
					{product.name}
				</h3>
				<p className="text-xl text-primary font-bold">
					{product.price}<span className="text-lg">$</span>
				</p>
			</div>
            <Link className={buttonVariants({ variant: "secondary", className: "gap-2 md:mx-5 md:mb-5 mx-4 mb-4" })} href={`/client/${product.id}`}>
                More Details <MoreHorizontal />
            </Link>
		</div>
	);
};

export default ProductCard;
