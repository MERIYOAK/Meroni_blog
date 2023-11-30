import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import './tech_swiper.css';
import { Navigation, Pagination } from 'swiper/modules';
import Tech_trending_box from '../tech_trending_box/Tech_trending_box';

function TechSwiper(props) {
    const breakpoints = {
        1570: {
            slidesPerView: 5,
        },
        1250: {
            slidesPerView: 4,
        },
        940: {
            slidesPerView: 3,
        },
        627: {
            slidesPerView: 2,
        },
        300: {
            slidesPerView: 1,
        }
    }

    return (
        <Swiper
            breakpoints={breakpoints}
            className='slide'
            modules={[Pagination]}
            pagination={{
                clickable: true,
            }}
            spaceBetween={50}
        >
            {props.slides.map((post, index) => (
                <SwiperSlide key={index} className='slide_image'>
                    <Tech_trending_box blackBg={index % 2 === 0} post={post} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default TechSwiper;
