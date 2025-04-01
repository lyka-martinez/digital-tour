import { memo, useMemo } from 'react';
import { Button } from '../components/Buttons';

type LandingPageProps = {
    startTour: boolean;
    returnToLanding: boolean;
    onStartTour: () => void;
};

const LandingPage = ({ startTour, returnToLanding, onStartTour }: LandingPageProps) => {
    const classes = useMemo(() => {
        return `flex items-center justify-center h-svh overflow-y-auto bg-bottom-svg ${
            startTour ? 'slide-up' : returnToLanding ? 'slide-down' : ''
        }`;
    }, [startTour, returnToLanding]);

    
    return (
        <div className={classes}>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-screen gap-4 my-4 p-2 lg:px-[6.25rem] 2xl:px-[7.5rem]">
                <div className="flex flex-col items-center lg:items-start justify-center gap-9">
                    <img
                        src="./images/ter-long-logo.webp"
                        alt="TER Logo"
                        className="h-auto w-[10rem] md:w-[12.5rem] xl:w-[13.75rem] object-cover -ml-3"
                        loading="lazy"
                    />

                    <div className="flex flex-col text-center lg:text-start gap-5">
                        <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-brnd-secondary font-semibold capitalize tracking-wide">
                            Virtual Tour!
                        </p>

                        <p className="text-base md:text-lg xl:text-xl text-base-content/80 leading-7">
                            Welcome to our virtual tour. We're thrilled to guide <br /> you through an immersive experience and showcase <br />  all the amazing amenities we have to offer.
                        </p>
                    </div>

                    <Button text="Start Tour" onClick={onStartTour} />
                </div>

                <div className="rounded-xl overflow-hidden hidden lg:block">
                    <img
                        src="./images/ter-suite.webp"
                        alt="Suite Room Photo"
                        className="h-[32.5rem] xl:h-[36.25rem] w-auto object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default memo(LandingPage);