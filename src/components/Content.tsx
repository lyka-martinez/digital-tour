import { useMemo, useState } from "react";
import { Accordion } from "./Accordion";
import { Video } from "./Video";

import { Room } from "../types";

export default function Content() {
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const accordion = useMemo(() => <Accordion onRoomSelect={setSelectedRoom} />, []);

    return (
        <div className="flex-1 w-svw flex gap-8 overflow-y-auto overflow-hidden py-8 px-16">
            <div className="join custom-join join-vertical min-h-[30rem] w-3xs scrollbar-hidden overflow-y-auto">
                {accordion}
            </div>

            <div className="flex-1 min-h-[30rem] bg-neutral text-brnd-light rounded-xl">
                <Video room={selectedRoom} />
            </div>
        </div>
    );
}