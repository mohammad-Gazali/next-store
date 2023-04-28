import { buttonVariants } from "@/components/ui/button";
import { ProductWithMainImage } from "@/types/db";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import { Frown } from "lucide-react";
import { ProductsListCart } from "@/components";



export const metadata = {
	title: "Cart | Next Store",
	description: "Cart Page For Next Store",
};

export const revalidate = 30;

const page = async () => {
	const supabase = createServerComponentSupabaseClient({
		cookies,
		headers,
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user?.id) {
		return notFound();
	}

	const user_id = user.id;

	// @ts-ignore
	const { data }: { data: Cart[] } = await supabase
		.from("cart")
		.select()
		.eq("user", user_id);

	const user_cart = data[data.length - 1];

  if (!user_cart || user_cart.products.length === 0) {
    return <main className="flex items-center justify-center gap-3 sm:text-3xl text-2xl font-bold h-[80vh] text-secondary">No Products In The Cart Currently <Frown strokeWidth={2} className="w-10 h-10" /></main>
  }

	const { data: products } = await supabase
		.from("products")
		.select()
		.in("id", user_cart?.products);

	const { data: prodcutsImages } = await supabase
		.from("products-images-table")
		.select()
		.in("product", user_cart?.products)
		.eq("is_main", true);

	// @ts-ignore
	const finalData: ProductWithMainImage[] = products?.map((product) => {
		const productImage = prodcutsImages?.find((image) => {
			return image.product === product.id;
		});
		return { ...product, image: productImage };
	});

	const total_price = products
		?.reduce((preValue, currentProduct) => preValue + currentProduct.price, 0)
		?.toFixed(2);

	return (
		<main className="container max-w-2xl">
			<div className="flex h-full flex-col">
				<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 mt-5">
					<div className="flex w-full items-start justify-between">
						<h1 className="text-4xl font-bold uppercase text-secondary text-center">
							Shopping cart
						</h1>
					</div>
					<div className="mt-10">
						<div className="flow-root">
							<ProductsListCart products={finalData} />
						</div>
					</div>
				</div>
				<div className="border-t border-muted px-4 py-6 sm:px-6 flex flex-col">
					<div className="flex justify-between text-base font-medium">
						<p>Subtotal</p>
						<p>{total_price}$</p>
					</div>
					<p className="mt-0.5 text-sm text-muted-dark">
						Shipping and taxes calculated at checkout.
					</p>

					<Link
						href="#"
						className={buttonVariants({
							variant: "secondary",
							className: "w-full max-w-lg self-center mt-6",
							size: "lg",
						})}
					>
						Checkout
					</Link>

					<div className="mt-6 flex gap-2 justify-center items-center text-center text-sm text-muted-dark">
						<p>
							or
						</p>
            <Link
              href="/"
              className={buttonVariants({ variant: "link" })}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
					</div>
				</div>
			</div>
		</main>
	);
};

export default page;
