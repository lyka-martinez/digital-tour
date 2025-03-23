import { useState } from "react";
import { Accordion } from "./Accordion";
import { Video } from "./Video";

import { Room } from "../types";

export default function Content() {
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    return (
        <div className="flex-1 w-svw flex gap-8 overflow-hidden py-8 px-16">

            <div className="join custom-join join-vertical w-3xs scrollbar-hidden overflow-y-auto">
                <Accordion onRoomSelect={setSelectedRoom} />
            </div>

            <div className="flex-1 bg-neutral text-brnd-light rounded-xl">
                <Video room={selectedRoom} />
            </div>

        </div>
    );
}