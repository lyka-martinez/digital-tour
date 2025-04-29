import { useState, useCallback } from 'react';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';

import './styles/App.css';


export default function VirtualTourApp() {
    const [stat, setStat] = useState({
        startTour: false,
        hideLandingPage: false,
        returnToLanding: false,
    });


    const hndlStartTour = useCallback(() => {
        setStat((prev) => ({ ...prev, startTour: true }));
        setTimeout(() => {
            setStat((prev) => ({ ...prev, startTour: true, hideLandingPage: true }));
        }, 300);
    }, []);


    const hndlReturnToLanding = useCallback(() => {
        setStat((prev) => ({ ...prev, returnToLanding: true }));
        setTimeout(() => {
            setStat({ startTour: false, hideLandingPage: false, returnToLanding: true });
        }, 200);
        setTimeout(() => {
            setStat({ startTour: false, hideLandingPage: false, returnToLanding: false });
        }, 700);
    }, []);


    return (
        <>
            {!stat.hideLandingPage && (
                <LandingPage
                    startTour={stat.startTour}
                    returnToLanding={stat.returnToLanding}
                    onStartTour={hndlStartTour}
                />
            )}

            {stat.hideLandingPage && (
                <MainPage
                    returnToLanding={stat.returnToLanding}
                    onBack={hndlReturnToLanding}
                />
            )}
        </>
    )
}
