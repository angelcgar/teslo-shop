"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slideshow.css";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

interface Props {
	images: string[];
	title: string;
	className: string;
}

export const ProductMobileSlideshow = ({ images, className, title }: Props) => {
	return (
		<div className={className}>
			<Swiper
				style={{
					width: "100vw",
					height: "500px",
				}}
				pagination
				navigation={true}
				autoplay={{
					delay: 2500,
				}}
				modules={[FreeMode, Navigation, Autoplay, Pagination]}
				className="mySwiper2"
			>
				{images.map((image) => (
					<SwiperSlide key={image}>
						<Image
							width={600}
							height={500}
							src={`/products/${image}`}
							alt={title}
							className="object-fill"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
