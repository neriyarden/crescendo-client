import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import SwiperCore, {
    Autoplay
  } from 'swiper';

  SwiperCore.use([Autoplay]);

function Carousel({ children, ...props }) {
    return (
       <div className='mySwiper-container grid-panel'>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={'auto'}
                spaceBetween={32}
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
                    },
                    "768": {
                        "slidesPerView": 3,
                    },
                    "1024": {
                        "slidesPerView": 4,
                    },
                    "1280": {
                        "slidesPerView": 5,
                    },
                    "1440": {
                        "slidesPerView": 6,
                    }
                }}
                {...props}
            >
                {
                    children.map((thumb, i) => (
                        <SwiperSlide key={i}>{thumb}</SwiperSlide>
                    ))
                }
            </Swiper>
       </div>
    )
}

export default Carousel
