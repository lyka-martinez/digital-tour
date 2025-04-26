import { useState, useCallback, Fragment } from "react";
import Button from "./Buttons";
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
        <div className="facility-cont px-4 py-3 sm:px-5 md-lg:px-0 md-lg:bg-base-100 md-lg:border-r md-lg:border-neutral-content">
            <div className="flex flex-col gap-2">

                <div className="tabs tabs-border md-lg:flex-col">
                    {facilities.map((facility, index) => (
                        <Fragment key={index}>
                            <input
                                type="radio" 
                                name="facilities_tabs" 
                                className="tab lg:text-base lg:h-[2.625rem] md-lg:justify-start md-lg:mx-4 md-lg:px-2" 
                                aria-label={facility.title}
                                defaultChecked={index === 0}
                            />

                            <div className="tab-content rounded-xl border-base-300 bg-base-100 px-4 py-5 md-lg:rounded-none md-lg:border-none md-lg:py-2 xl:px-5">

                                <div className="divider mt-0 mb-4 h-fit hidden md-lg:flex"></div>

                                <div className="grid gap-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 md-lg:grid-cols-1">
                                    {facility.rooms.map((room, roomIndex) => (
                                        <Button
                                            key={roomIndex}
                                            type="facility"
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
