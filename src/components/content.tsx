//components
import {Dropdown} from './dropdown.tsx';
import {Video} from './video_content.tsx';

export function Content() {
    return (
        <>
            <div className="flex flex-row mx-20 mt-10 gap-5 justify-between">
                <Dropdown/>
                <Video/>
            </div>
        </>
    )
}