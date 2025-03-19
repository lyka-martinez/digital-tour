//components
import {Video} from './video_content.tsx';
import {Accordion} from './accordion.tsx';
import accordionData from '../data/accordion.json';

export function Content() {
    return (
        <>
            <div className="flex flex-row mx-20 mt-10 gap-5 justify-between">
                <div className='flex flex-col gap-5 overflow-y-auto scrollbar-hidden'>

                    {accordionData.map((acData, index) => (
                        <Accordion key={index} title= {acData.title} no_drops={acData.no_drops} with_drops={acData.with_drops} rooms={acData.rooms}/>
                    ))}
                    
                </div>

                <Video/>
            </div>
        </>
    )
}