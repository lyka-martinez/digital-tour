import { useState, useCallback } from "react";
import { AccordionButton } from "./Buttons";
import { Room } from "../types";

import facilities from "../data/facilities.json";

type AccordionProps = {
    onRoomSelect: (room: Room) => void;
};

export const Accordion = ({ onRoomSelect }: AccordionProps) => {
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
        <>
            {facilities.map((facility, index) => (
                <div
                    key={index}
                    className="collapse collapse-arrow join-item bg-base-100 border-base-300 border"
                >
                    <input
                        type="checkbox"
                        name="accordion-group"
                        defaultChecked={index === 0}    // Apply defaultChecked to the first accordion
                    />
                    <div className="collapse-title font-semibold text-brnd-secondary">
                        {facility.title}
                    </div>

                    <div className="collapse-content flex flex-col gap-3">
                        {facility.rooms.map((room, roomIndex) => (
                            <AccordionButton
                                key={roomIndex}
                                text={room.name}
                                onClick={() => handleRoomSelect(room)}
                                isActive={activeRoom === room.name}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}