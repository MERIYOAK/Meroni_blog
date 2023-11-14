import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import './swiper.css'
import { Navigation, Pagination } from 'swiper/modules';

export const Slider = ({ slides }) => {
    const breakpoints = {
        1400: {
            slidesPerView: 5
        },
        1120: {
            slidesPerView: 4,
        },
        860: {
            slidesPerView: 3,
        },
        600: {
            slidesPerView: 2,
        },
        300: {
            slidesPerView: 1,
        },
    }
    return (
        <Swiper
            breakpoints={breakpoints}
            className='slide'
            modules={[Navigation, Pagination]}
            navigation
            pagination={{
                clickable: true
            }}
            spaceBetween={30}
            slidesPerView={5}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className='slide_image'>
                    <a href={slide.URL} title={slide.title}><img src={slide.image} alt={slide.title} /></a>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
