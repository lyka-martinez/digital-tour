import { useState, useCallback, Fragment } from "react";
import { FacilityButton } from "./Buttons";
import { Room } from "../types";

import facilities from "../data/facilities.json";

type AccordionProps = {
    onRoomSelect: (room: Room) => void;
};

export const Facility = ({ onRoomSelect }: AccordionProps) => {
    const [activeRoom, setActiveRoom] = useState<string | null>(null);


    const handleRoomSelect = useCallback((room: Room) => {
        if (!room.video && (!room.bedOptions || room.bedOptions.length === 0)) {
            console.error(`Room "${room.name}" has no video property.`);
            return;
        }

        if (room.name === activeRoom) return;   // Return early if the room is the same
        setActiveRoom(room.name);
        onRoomSelect(room);
    }, [activeRoom, onRoomSelect]);


    return (
        <div className="facility-cont px-4 py-3">
            <div className="flex flex-col gap-2">

                <div className="tabs tabs-border">
                    {facilities.map((facility, index) => (
                        <Fragment key={index}>
                            <input
                                type="radio" 
                                name="facilities_tabs" 
                                className="tab " 
                                aria-label={facility.title}
                                defaultChecked={index === 0}
                            />

                            <div className="tab-content rounded-xl border-base-300 bg-base-100 px-4 py-5">

                                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                                    {facility.rooms.map((room, roomIndex) => (
                                        <FacilityButton
                                            key={roomIndex}
                                            text={room.name}
                                            onClick={() => handleRoomSelect(room)}
                                            isActive={activeRoom === room.name}
                                        />
                                    ))}
                                </div>

                            </div>
                        </Fragment>
                    ))}
                </div>

            </div>
        </div>
    );
}
