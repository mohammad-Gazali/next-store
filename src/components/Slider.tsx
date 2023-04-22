"use client";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


// TODO: add slides attribute
const Slider = () => {
	return (
		<Carousel showThumbs={false} showArrows={false} showIndicators={false} showStatus={false} emulateTouch autoPlay infiniteLoop>
			<div className="h-56">
				<img src="hero.jpg" />
			</div>
			<div className="h-56">
				<img src="hero.jpg" />
			</div>
		</Carousel>
	);
};

export default Slider;
