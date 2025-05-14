import { memo, useState, useMemo } from "react";
import NavBar from '../components/NavBar';
import { Facility } from '../components/Facility';
import { Video } from '../components/Video';
import { Room } from "../types";
import facilities from "../data/facilities.json";


type MainPageProps = {
    returnToLanding: boolean;
    onBack: () => void;
};


/* Main page for the Virtual Tour. */
const MainPage = ({ returnToLanding, onBack }: MainPageProps) => {

    /**
     * Get the initial room from the first facility
     */
    const initRoom = useMemo(() => {
        const firstFacility = facilities[0];

        return firstFacility.rooms
            ? firstFacility.rooms[0]
            : {
                name: firstFacility.title,
                description: firstFacility.description,
                video: firstFacility.video || "",
                images: firstFacility.images || []
            };
    }, []);

    
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(initRoom);


    return (
        <div 
            className={`flex flex-col items-center justify-start h-svh bg-brnd-base ${
                returnToLanding ? "fade-out" : "fade-in"
            }`}
        >
            <NavBar onClick={onBack} />

            <div className="main-area-cont flex-1 w-svw flex flex-col overflow-y-auto pb-4 md-lg:flex-row-reverse md-lg:pb-0 md-lg:overflow-hidden">
                <Video room={selectedRoom} />
                <Facility onRoomSelect={setSelectedRoom} />
            </div>
        </div>
    );
}

export default memo(MainPage);
