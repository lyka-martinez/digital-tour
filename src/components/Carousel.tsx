import { memo } from 'react';
import { Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel} from 'swiper/modules';


/* Carousel component for iamges */
const Carousel = () => {
    return ( 
        <div className="grid grid-flow-col gap-2 xs:justify-start">
            <button 
                className="btn font-medium rounded-lg shadow-xs text-brnd-secondary bg-base-100 hover:bg-base-100/40 xl:h-[2.625rem]"
                onClick={() => {
                    const modal = document.getElementById('carousel-cont') as HTMLDialogElement | null;
                    if (modal) modal.showModal();
                }}
            >
                <Images className="w-auto h-[1.125rem]" />
                View Images
            </button>

            <dialog id="carousel-cont" className="modal">
                <div className="modal-box size-full max-w-full rounded-none flex flex-wrap items-center justify-center">

                    <div className="carousel-toolbar">
                        {/* data index w/ button controllers */}
                        <div className="hidden absolute left-[50%] -translate-x-[50%] sm:flex">
                            <button className="carousel-btn btn btn-ghost bg-transparent shadow-none text-white border-none p-0 size-[48px]">
                                <ChevronLeft className="icon" />
                            </button>

                            <div className="min-w-[72px] text-center leading-[48px]">
                                <span data-index>1</span>
                                &nbsp;/&nbsp;
                                <span data-index>6</span>
                            </div>
                            
                            <button className="carousel-btn btn btn-ghost bg-transparent shadow-none text-white border-none p-0 size-[48px]">
                                <ChevronRight className="icon" />
                            </button>
                        </div>

                        {/* close modal button */}
                        <form method="dialog">
                            <button className="carousel-btn btn btn-ghost bg-transparent shadow-none text-white border-none p-0 size-[48px]">
                                <X className="icon" />
                            </button>
                        </form>
                    </div>

                    <Swiper
                        className="custom-swiper"
                        modules={[Keyboard, Mousewheel]}
                        keyboard={{
                            enabled: true,
                        }}
                        grabCursor={true}
                        mousewheel={true}
                        loop={true}
                    >
                        <SwiperSlide>
                            <img
                                src="https://swiperjs.com/demos/images/nature-1.jpg"
                                loading="lazy"
                            />
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://swiperjs.com/demos/images/nature-2.jpg"
                                loading="lazy"
                            />
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img    
                                src="https://swiperjs.com/demos/images/nature-3.jpg"
                                loading="lazy"
                            />
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://swiperjs.com/demos/images/nature-4.jpg"
                                loading="lazy"
                            />
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </SwiperSlide>
                    </Swiper>

                    <div className="carousel-nav">
                        <button className="carousel-btn is-prev btn btn-ghost bg-transparent shadow-none text-white border-none p-0 size-[48px]">
                            <ChevronLeft className="icon" />
                        </button>

                        <button className="carousel-btn is-next btn btn-ghost bg-transparent shadow-none text-white border-none p-0 size-[48px]">
                            <ChevronRight className="icon" />
                        </button>
                    </div>
                    
                </div>
            </dialog>
        </div>
    );
};

export default memo(Carousel);
