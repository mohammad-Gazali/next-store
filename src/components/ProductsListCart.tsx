"use client";

import { ProductWithMainImage } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import { FC, useState, MouseEvent } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "./ui/use-toast";



interface ProductsListCartProps {
    products: ProductWithMainImage[]
}

const ProductsListCart: FC<ProductsListCartProps> = ({ products }) => {
    
    const [productsState, setProductsState] = useState(products);

    const { toast } = useToast();

    const handleRemove = async (product_id: string) => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cart/remove`, {
                method: "POST",
                body: JSON.stringify({
                    product_id
                })
            })

            const data = await response.json();

            if (response.status == 200) {

                toast({
					title: "Success",
					description: data.message,
				})

                setProductsState((preState) => {
                    return preState.filter(product => product.id !== product_id)
                })

            } else {
                toast({
					variant: "destructive",
					title: "Error",
					description: data.message,
				})
            }

        } catch (error) {

            toast({
                variant: "destructive",
                title: "Error",
                description: String(error),
            })

            console.log(error)
        }
    }

	return (
		<ul role="list" className="-my-6 divide-y divide-muted">
			{productsState?.map((product) => (
				<li key={product.id} className="flex py-6">
					<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-muted">
						<Image
							alt={product.name}
							src={product.image.image_url}
							className="w-24 h-24 object-cover object-center"
							width={96}
							height={96}
						/>
					</div>
					<div className="ml-4 flex flex-1 flex-col">
						<div>
							<div className="flex justify-between text-base font-medium">
								<h3>
									<Link href={`/client/${product.id}`}>{product.name}</Link>
								</h3>
								<p className="ml-4">{product.price}$</p>
							</div>
						</div>
						<div className="flex flex-1 items-end justify-end text-sm">
							<div className="flex">
								<Button
									onClick={() => handleRemove(product.id)}
									className="gap-1"
									variant="destructive"
									size="sm"
								>
									Remove <Trash2 className="w-4 h-4" />
								</Button>
							</div>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};

export default ProductsListCart;
