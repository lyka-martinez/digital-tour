import { memo, useMemo, useState } from "react";
import NavBar from '../components/NavBar';
import { Facility } from '../components/Facility';
import { Video } from '../components/Video';
import { Room } from "../types";


type MainPageProps = {
    returnToLanding: boolean;
    onBack: () => void;
};

const MainPage = ({ returnToLanding, onBack }: MainPageProps) => {  
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);


    const classes = useMemo(() => {
        return `flex flex-col items-center justify-start h-svh bg-brnd-base ${
            returnToLanding ? 'fade-out' : 'fade-in'
        }`;
    }, [returnToLanding]);


    return (
        <div className={classes}>
            <NavBar onClick={onBack} />

            <div className="main-area-cont flex-1 w-svw flex flex-col overflow-y-auto pb-4 md-lg:flex-row-reverse md-lg:pb-0 md-lg:overflow-hidden">
                <Video room={selectedRoom} />
                <Facility onRoomSelect={setSelectedRoom} />
            </div>
        </div>
    );
}

export default memo(MainPage);
