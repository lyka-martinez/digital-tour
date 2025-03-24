import { useMemo, useState } from 'react';
import { Button } from './components/Buttons';
import NavBar from './components/NavBar';
import Content from './components/Content';

import './styles/App.css';

export default function VirtualTourApp() {
    const [stat, setStat] = useState({
        startTour: false,
        hideLandingPage: false,
        returnToLanding: false,
    });

    const handleStartTour = () => {
        setStat({ ...stat, startTour: true });
        setTimeout(() => setStat({ ...stat, startTour: true, hideLandingPage: true }), 300);
    };

    const handleReturnToLanding = () => {
        setStat({ ...stat, returnToLanding: true });
        setTimeout(() => setStat({ startTour: false, hideLandingPage: false, returnToLanding: true }), 200);
        setTimeout(() => setStat({ startTour: false, hideLandingPage: false, returnToLanding: false }), 700);
    };

    const landingPageClasses = useMemo(() => {
        return `flex items-center justify-center h-svh overflow-y-auto bg-bottom-svg ${
            stat.startTour ? 'slide-up' : stat.returnToLanding ? 'slide-down' : ''
        }`;
    }, [stat.startTour, stat.returnToLanding]);

    const mainContentClasses = useMemo(() => {
        return `flex flex-col items-center justify-center h-svh bg-brnd-base ${
            stat.returnToLanding ? 'fade-out' : 'fade-in'
        }`;
    }, [stat.returnToLanding]);

    return (
        <>
            {!stat.hideLandingPage && (
                <LandingPage classes={landingPageClasses} onStartTour={handleStartTour} />
            )}

            {stat.hideLandingPage && (
                <MainContent classes={mainContentClasses} onBack={handleReturnToLanding} />
            )}
        </>
    )
}

const LandingPage = ({ classes, onStartTour }: { classes: string; onStartTour: () => void }) => {
    return (
        <div className={classes}>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-screen gap-4 my-4 p-2 lg:px-[6.25rem] 2xl:px-[7.5rem]">
                <div className="flex flex-col items-center lg:items-start justify-center gap-9">
                    <img
                        src="./images/ter-long-logo.png"
                        alt="TER Logo"
                        className="h-auto w-[11.25rem] md:w-[12.5rem] xl:w-[13.75rem] object-cover -ml-3"
                    />

                    <div className="flex flex-col text-center lg:text-start gap-5">
                        <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-brnd-secondary font-semibold capitalize tracking-wide">
                            Virtual Tour!
                        </p>

                        <p className="text-base md:text-lg xl:text-xl text-base-content/80 leading-7">
                            Welcome to our virtual tour. We're thrilled to guide you <br /> through an immersive experience and showcase all <br /> the amazing amenities we have to offer.
                        </p>
                    </div>

                    <Button text="Start Tour" onClick={onStartTour} />
                </div>

                <div className="rounded-xl overflow-hidden hidden lg:block">
                    <img
                        src="./images/ter-suite.jpg"
                        alt="Suite Room Photo"
                        className="h-[32.5rem] xl:h-[36.25rem] w-auto object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

const MainContent = ({ classes, onBack }: { classes: string; onBack: () => void }) => {
    return (
        <div className={classes}>
            <NavBar onBack={onBack} />
            <Content />
        </div>
    );
}