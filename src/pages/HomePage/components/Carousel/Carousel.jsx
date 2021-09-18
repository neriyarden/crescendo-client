import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import SwiperCore, {
    Autoplay
  } from 'swiper';

  SwiperCore.use([Autoplay]);

function Carousel({ children }) {
    return (
        <Swiper
            modules={[Autoplay]}
            slidesPerView={'auto'}
            className="mySwiper"
            centeredSlides={true}
            grabCursor={true}
            loop={true}
            autoplay={{
                "delay": 4000,
                "disableOnInteraction": false
            }}
            breakpoints={{
                "640": {
                    "slidesPerView": 2,
                    "spaceBetween": 16
                },
                "768": {
                    "slidesPerView": 3,
                    "spaceBetween": 48
                },
                "1024": {
                    "slidesPerView": 4,
                    "spaceBetween": 48
                },
                "1280": {
                    "slidesPerView": 5,
                    "spaceBetween": 48
                },
                "1440": {
                    "slidesPerView": 6,
                    "spaceBetween": 48
                }
            }}
        >
            {
                children.map((thumb, i) => (
                    <SwiperSlide key={i}>{thumb}</SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default Carousel
