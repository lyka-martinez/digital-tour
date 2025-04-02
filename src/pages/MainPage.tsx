import { memo, useMemo, useState } from "react";
import NavBar from '../components/NavBar';
import { Accordion } from '../components/Accordion';
import { Video } from '../components/Video';
import { Room } from "../types";

type MainPageProps = {
    returnToLanding: boolean;
    onBack: () => void;
};

const MainPage = ({ returnToLanding, onBack }: MainPageProps) => {
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);


    const classes = useMemo(() => {
        return `flex flex-col items-center justify-center h-svh bg-brnd-base ${
            returnToLanding ? 'fade-out' : 'fade-in'
        }`;
    }, [returnToLanding]);

    
    return (
        <div className={classes}>
            <NavBar onClick={onBack} />

            <div className="flex-1 w-svw flex gap-8 overflow-y-auto overflow-hidden py-8 px-16">
                <div className="join custom-join join-vertical min-h-[30rem] w-3xs scrollbar-hidden overflow-y-auto">
                    <Accordion onRoomSelect={setSelectedRoom} />
                </div>

                <div className="flex-1 min-h-[30rem] bg-neutral text-brnd-light rounded-xl overflow-hidden">
                    <Video room={selectedRoom} />
                </div>
            </div>
        </div>
    );
}

export default memo(MainPage);