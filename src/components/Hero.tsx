import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import Slider from "./Slider";

const Hero = () => {
	return (
		<div className="max-w-[85rem] mx-auto lg:px-8 sm:px-6 px-4 py-10 flex items-center justify-between flex-wrap gap-8">
			<div className="max-w-lg">
				<h1 className="font-bold lg:text-3xl md:text-2xl text-xl">
					Start your journey with{" "}
					<span className="text-secondary">Next Store</span>
				</h1>
				<p className="mt-3 text-lg">
					Best Store For All Products: Clothes, Foods, Electronics, Books, Toys
					And More.
				</p>
				<div className="mt-7 flex flex-wrap gap-3 w-full">
					<Link
						href="#"
						className={buttonVariants({ variant: "secondary" })}
					>
						Discover Our Products
					</Link>
					<a className={buttonVariants({ variant: "outline" })} href="#">
						Contact sales team
					</a>
				</div>
			</div>
			<div className="max-w-lg">
				<Slider />
			</div>
		</div>
	);
};

export default Hero;
