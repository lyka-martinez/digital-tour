//components
import {Dropdown} from './dropdown.tsx';

export function Content() {
    return (
        <>
            <div className="flex flex-row mx-20 mt-10">
                <div className='flex flex-col gap-5'>
                    <Dropdown/>
                </div>
            </div>
        </>
    )
}