//components
import {Video} from './video_content.tsx';
import {Accordion} from './accordion.tsx';

export function Content() {
    return (
        <>
            <div className="flex flex-row mx-20 mt-10 gap-5 justify-between">
                <div className='flex flex-col gap-5 overflow-y-auto scrollbar-hidden'>
                    {/* Lobby */}
                    <Accordion title='Lobby' no_drops={["Front Office", "Elevator"]}/>

                    {/* Amenities */}
                    <Accordion title='Amenities' no_drops={["Function Room", "Swimming Pool", "Jacuzzi", "Fitness Center", "Game Room", "Mini Golf", "Children's Playground"]}/>

                    {/* Room */}
                    <Accordion title='Room' with_drops={["Classic", "Deluxe", "Premiere"]} rooms={[
                        {name: "Queen"},
                        {name: "Twin"}
                    ]} no_drops={["Suite"]}/>
                </div>

                <Video/>
            </div>
        </>
    )
}