"use client";

import { ProductImage } from "@/types/db";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";



const Slider = () => {
	const [featuredImages, setFeaturedImages] = useState<ProductImage[]>([]);

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/featured-images`)
			.then((res) => res.json())
			.then((data) => {
				setFeaturedImages(data.featuredImages);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<Carousel
			showThumbs={false}
			showArrows={false}
			showIndicators={false}
			showStatus={false}
			emulateTouch
			autoPlay
			infiniteLoop
		>
			{featuredImages?.map((image) => (
				<div key={image.id} className="h-56">
					<img
						src={image.image_url}
						alt={`product-image-${image.created_at}`}
					/>
				</div>
			))}
		</Carousel>
	);
};

export default Slider;
