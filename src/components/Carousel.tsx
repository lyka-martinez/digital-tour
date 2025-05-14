import { memo, useRef, useState, useEffect } from 'react';
import { Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel } from 'swiper/modules'


type SlideBtnProps = {
    swiperRef: React.RefObject<any>;
    position?: 'nav' | 'toolbar';
};


/* Custom button components for Swiper navigation */
const SlidePrevButton = ({ swiperRef, position }: SlideBtnProps) => {
    const buttonClass = position === 'nav' ? 'is-prev' : '';

    return (
        <button
            className={`carousel-btn ${buttonClass} btn btn-ghost bg-transparent shadow-none text-white border-none p-0 size-[3rem]`}
            onClick={() => {
                swiperRef.current?.slidePrev();
            }}
        >
            <ChevronLeft className="icon" />
        </button>
    );
};


const SlideNextButton = ({ swiperRef, position }: SlideBtnProps) => {
    const buttonClass = position === 'nav' ? 'is-next' : '';

    return (
        <button
            className={`carousel-btn ${buttonClass} btn btn-ghost bg-transparent shadow-none text-white border-none p-0 size-[3rem]`}
            onClick={() => {
                swiperRef.current?.slideNext();
            }}
        >
            <ChevronRight className="icon" />
        </button>
    );
};




type CarouselProps = {
    images: string[];
};


/* Carousel component for iamges */
const Carousel = ({ images }: CarouselProps) => {
    const swiperRef = useRef<any>(null);
    const [currentSlide, setCurrentSlide] = useState(1);


    /**
     * Reset current slide when images change
     */
    useEffect(() => {
        if (!swiperRef.current) return;

        swiperRef.current.slideTo(0, 0);
        setCurrentSlide(1);
    }, [images]);


    /* Handle slide change event. */
    const hndlSlideChange = () => {
        if (swiperRef.current) {
            setCurrentSlide(swiperRef.current.realIndex + 1);
        }
    };


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
                            <SlidePrevButton position="toolbar" swiperRef={swiperRef} />

                            <div className="min-w-[4.5rem] text-center leading-[3rem]">
                                <span>{currentSlide}</span>
                                <span className="text-xs">&nbsp;/&nbsp;</span>
                                <span>{images.length}</span>
                            </div>
                            
                            <SlideNextButton position="toolbar" swiperRef={swiperRef} />
                        </div>

                        {/* close modal button */}
                        <form method="dialog">
                            <button className="carousel-btn btn btn-ghost bg-transparent shadow-none text-white border-none p-0 size-[3rem]">
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
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={hndlSlideChange}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image} alt={`Image ${index + 1}`} loading="lazy" />
                                <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="carousel-nav">
                        <SlidePrevButton position="nav" swiperRef={swiperRef} />
                        <SlideNextButton position="nav" swiperRef={swiperRef} />
                    </div>

                </div>
            </dialog>
        </div>
    );
};

export default memo(Carousel);
