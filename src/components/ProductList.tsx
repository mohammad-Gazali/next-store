import { ProductWithImages, ProductImage } from "@/types/db";
import ProductCard from "./ProductCard";



const ProductList = async () => {

	const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/product`, {
		cache: "no-store"
	});

	const { dataProducts, dataImages } = await response.json()

	// @ts-ignore
	const finalData: ProductWithImages[] = dataProducts?.map((product) => {
		const productImages = dataImages?.filter((image: ProductImage) => {
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
