import { useState, useCallback, useEffect, Fragment } from "react";
import Button from "./Button";
import { Room } from "../types";
import { mapFacilityToRoom } from "../utils/facilityUtils";
import facilities from "../data/facilities.json";


type FacilityProps = {
    onRoomSelect: (room: Room | null) => void;
};


/* Facility component for selecting facility and room */
export const Facility = ({ onRoomSelect }: FacilityProps) => {
    const [activeRoom, setActiveRoom] = useState<string | null>(null);
    const [activeFacility, setActiveFacility] = useState<string | null>(null);


    /**
     * Select first facility and room on mount
     */
    useEffect(() => {
        const firstFacility = facilities[0];
        const firstRoom = firstFacility.rooms?.[0];

        setActiveFacility(firstFacility.title);
        setActiveRoom(firstRoom?.name || firstFacility.title);
        onRoomSelect(firstRoom || mapFacilityToRoom(firstFacility));
    }, [onRoomSelect]);
    

    /* Handle room selection */
    const hndlRoomSelect = useCallback(
        (room: Room) => {
            if (room.name === activeRoom) return;

            setActiveRoom(room.name);
            onRoomSelect(room);
        },
        [activeRoom, onRoomSelect]
    );


    /* Handle facility selection */
    const hndlFacilitySelect = useCallback(
        (facility: any) => {
            if (facility.title === activeFacility) return;
            setActiveFacility(facility.title);

            if (facility.rooms) return;
            
            setActiveRoom(facility.title);
            onRoomSelect(mapFacilityToRoom(facility));
        },
        [activeFacility, onRoomSelect]
    );


    return (
        <div className="facility-cont px-4 py-3 sm:px-5 md-lg:px-0 md-lg:bg-base-100 md-lg:border-r md-lg:border-neutral-content">
            <div className="flex flex-col gap-2">

                <div className="tabs tabs-border md-lg:flex-col">
                    {facilities.map((facility, index) => (
                        <Fragment key={index}>
                            <input
                                type="radio" 
                                name="facilities_tabs"
                                className="tab mb-2 lg:text-base lg:h-[2.625rem] md-lg:justify-start md-lg:mx-4 md-lg:mb-0 md-lg:px-2"
                                aria-label={facility.title}
                                defaultChecked={index === 0}
                                onClick={() => hndlFacilitySelect(facility)}
                            />

                            {facility.rooms && (
                                <div className="tab-content rounded-xl border-base-300 bg-base-100 px-4 py-5 md-lg:rounded-none md-lg:border-none md-lg:py-2 xl:px-5">
                                    <div className="divider mt-0 mb-4 h-fit hidden md-lg:flex"></div>

                                    <div className="grid gap-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 md-lg:grid-cols-1">
                                        {facility.rooms.map((room, roomIndex) => (
                                            <Button
                                                key={roomIndex}
                                                type="facility"
                                                text={room.name}
                                                onClick={() => hndlRoomSelect(room)}
                                                isActive={activeRoom === room.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>

            </div>
        </div>
    );
}
