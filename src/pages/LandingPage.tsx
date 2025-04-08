import { memo, useMemo } from 'react';
import { Button } from '../components/Buttons';

type LandingPageProps = {
    startTour: boolean;
    returnToLanding: boolean;
    onStartTour: () => void;
};

const LandingPage = ({ startTour, returnToLanding, onStartTour }: LandingPageProps) => {
    const classes = useMemo(() => {
        return `grid grid-cols-1 min-h-screen max-w-screen overflow-y-auto bg-bottom-svg lg:grid-cols-2 xl:grid-cols-[42.5rem__1fr] ${
            startTour ? 'slide-up' : returnToLanding ? 'slide-down' : ''
        }`;
    }, [startTour, returnToLanding]);

    
    return (
        <div className={classes}>
            <div>
                <div className="flex h-screen items-center justify-center px-2 py-10 text-center min-h-[45.656rem] lg:text-start lg:justify-start lg:ps-18 lg:pe-0 xl:ps-24">

                    <div>
                        <div className="flex flex-col items-center lg:items-start">
                            <img
                                src="./images/ter-long-logo.webp"
                                alt="TER Logo"
                                className="object-cover -ml-3 h-auto w-[10rem] md:w-[12.5rem] xl:w-[13.75rem]"
                                loading="lazy"
                            />
                        </div>
                        <div className="h-9"></div>

                        <p className="text-[2rem] text-brnd-secondary font-semibold capitalize tracking-wide md:text-4xl lg:text-5xl xl:text-[3.25rem]">
                            Virtual Tour!
                        </p>

                        <p className="text-base-content/75 text-balance leading-[1.625] py-4 md:text-lg xl:text-xl">
                            Welcome to our virtual tour! Experience an <br />
                            immersive journey as we showcase the <br />
                            exceptional amenities and features we offer.
                        </p>
                        <div className="h-9"></div>

                        <Button text="Start Tour" onClick={onStartTour} />
                    </div>
                    
                </div>
            </div>

            <div className="hidden overflow-hidden lg:flex lg:py-18 xl:py-20">
                <img
                    src="./images/ter-suite.webp"
                    alt="Suite Room Photo"
                    className="object-cover rounded-l-full w-auto h-full"
                />
            </div>
        </div>
    );
}

export default memo(LandingPage);