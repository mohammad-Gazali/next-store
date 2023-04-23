import { ProductWithImages } from "@/types/db";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import ProductCard from "./ProductCard";

const ProductList = async () => {
	const supabase = createServerComponentSupabaseClient({
		cookies,
		headers,
	});

	const { data: dataProducts } = await supabase.from("products").select().gt('quantity', '0');

	const { data: dataImages } = await supabase
		.from("products-images-table ")
		.select();

	// @ts-ignore
	const finalData: ProductWithImages[] = dataProducts?.map((product) => {
		const productImages = dataImages?.filter((image) => {
			return image.product === product.id;
		});

		return { ...product, images: productImages };
	});

	return (
    <div className="flex justify-center flex-wrap gap-10 lg:px-8 sm:px-6 px-4 pt-10 pb-20">
      {finalData.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
