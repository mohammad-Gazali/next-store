import { Button } from "@/components/ui/button";
import { Image, Product } from "@/types/db";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ShoppingCart, Star } from "lucide-react";
import { cookies, headers } from "next/headers";
import NextImage from "next/image";
import { notFound } from "next/navigation";



export const metadata = {
	title: "Product Details | Next Store",
	description: "Product Detauls Page For Next Store",
};

const highlights = [
    "This is highlight number one.",
    "This is highlight number two.",
    "This is highlight number three."
]

const page = async ({
	params: { product_id },
}: {
	params: { product_id: string };
}) => {
	const supabase = createServerComponentSupabaseClient({
		cookies,
		headers,
	});

	const { data: productResult } = await supabase
		.from("products")
		.select()
		.eq("id", product_id)
        .gt("quantity", "0");

	if (!productResult) {
		return notFound();
	}

	// @ts-ignore
	const product: Product = productResult[0];

	const { data: productImagesResult } = await supabase
		.from("products-images-table")
		.select()
		.eq("product", product_id);

	// @ts-ignore
	const productImages: Image[] = productImagesResult;

    const mainImage = productImages.find(image => image.is_main);

    const notMainImages = productImages.filter(image => !image.is_main);

	return (
		<div className="pt-10">
			{/* Breadcrumb */}
			<nav aria-label="Breadcrumb">
				<ol
					role="list"
					className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
				>
					<li>
						<div className="flex items-center">
							<a href="#" className="mr-2 text-sm font-medium text-gray-900">
								Main Catergory
							</a>
							<svg
								width={16}
								height={20}
								viewBox="0 0 16 20"
								fill="currentColor"
								aria-hidden="true"
								className="h-5 w-4 text-gray-300"
							>
								<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
							</svg>
						</div>
					</li>
					<li>
						<div className="flex items-center">
							<a href="#" className="mr-2 text-sm font-medium text-gray-900">
								Sub Category
							</a>
							<svg
								width={16}
								height={20}
								viewBox="0 0 16 20"
								fill="currentColor"
								aria-hidden="true"
								className="h-5 w-4 text-gray-300"
							>
								<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
							</svg>
						</div>
					</li>
					<li className="text-sm">
						<a
							href="#"
							aria-current="page"
							className="font-medium text-gray-500 hover:text-gray-600"
						>
							{product.name}
						</a>
					</li>
				</ol>
			</nav>
			{/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <NextImage
              src={notMainImages[0]?.image_url || mainImage?.image_url!}
              alt={`${product.name}-first-image`}
              className="h-96 w-full object-cover object-center rounded-lg"
              width={100}
              height={384}
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <NextImage
                src={notMainImages[1]?.image_url || mainImage?.image_url!}
                alt={`${product.name}-second-image`}
                className="h-48 w-full object-cover object-center rounded-lg"
                width={100}
                height={192}
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <NextImage
                src={notMainImages[2]?.image_url || mainImage?.image_url!}
                alt={`${product.name}-third-image`}
                className="h-48 w-full object-cover object-center rounded-lg"
                width={100}
                height={192}
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <NextImage
              src={mainImage?.image_url!}
              alt={`${product.name}-fourth-image`}
              className="h-96 w-full object-cover object-center rounded-lg"
              width={100}
              height={384}
            />
          </div>
        </div>

			{/* Product info */}
			<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
				<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
					<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
						{product.name}
					</h1>
				</div>

				{/* Options */}
				<div className="mt-4 lg:row-span-3 lg:mt-0">
					<h2 className="sr-only">Product information</h2>
					<p className="text-3xl tracking-tight text-secondary font-bold">
						{product.price}$
					</p>

					{/* Reviews */}
					<div className="mt-6">
						<h3 className="sr-only">Reviews</h3>
						<div className="flex items-center">
							<div className="flex items-center">
								{[0, 1, 2, 3, 4].map((rating) => (
									<Star
										key={rating}
										fill={
											Math.round(4.2) > rating
												? "var(--primary)"
												: "var(--muted)"
										}
										className={`${
											Math.round(4.2) > rating ? "text-primary" : "text-muted"
										} h-5 w-5 flex-shrink-0`}
										aria-hidden="true"
									/>
								))}
							</div>
							<p className="sr-only">4.2 out of 5 stars</p>
							<a
								href="/"
								className="ml-3 text-sm font-medium text-primary hover:text-primary-dark"
							>
								1892 reviews
							</a>
						</div>
					</div>
                    <Button
                    variant="secondary"
                    className="mt-10 gap-2 w-full text-base"
                    >
                        Add To Cart <ShoppingCart />
                    </Button>
				</div>

				<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-muted lg:pb-16 lg:pr-8 lg:pt-6">
					{/* Description and details */}
					<div>
						<h3 className="sr-only">Description</h3>

						<div className="space-y-6">
							<p className="text-base">{product.description}</p>
						</div>
					</div>

					<div className="mt-10">
						<h3 className="text-sm font-medium">Highlights</h3>

						<div className="mt-4">
							<ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                            {highlights.map((highlight) => (
                                <li key={highlight} className="text-muted">
                                    <span className="text-muted-dark">{highlight}</span>
                                </li>
                            ))}
							</ul>
						</div>
					</div>
					<div className="mt-10">
						<h3 className="text-sm font-medium">Quantity</h3>
						<p className="text-sm mt-4">
							There Is Only {product.quantity} Piece(s).
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
