import { useState, useCallback } from 'react';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import './styles/App.css';


/* Main app component for the Virtual Tour. */
export default function VirtualTourApp() {
    const [stat, setStat] = useState({
        startTour: false,
        hideLandingPage: false,
        returnToLanding: false,
    });


    /**
     * Handler for starting the tour.
     * Triggers slide-up animation and hides landing page after delay.
     */
    const hndlStartTour = useCallback(() => {
        setStat((prev) => ({ ...prev, startTour: true }));
        setTimeout(() => {
            setStat((prev) => ({ ...prev, startTour: true, hideLandingPage: true }));
        }, 300);
    }, []);


    /**
     * Handler for returning to the landing page.
     * Triggers slide-down animation and resets state after delays.
     */
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
            {/* Show LandingPage unless hidden */}
            {!stat.hideLandingPage && (
                <LandingPage
                    startTour={stat.startTour}
                    returnToLanding={stat.returnToLanding}
                    onStartTour={hndlStartTour}
                />
            )}

            {/* Show MainPage when landing page is hidden */}
            {stat.hideLandingPage && (
                <MainPage
                    returnToLanding={stat.returnToLanding}
                    onBack={hndlReturnToLanding}
                />
            )}
        </>
    )
}
