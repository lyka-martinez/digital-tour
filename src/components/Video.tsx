import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import { Check } from 'lucide-react';
import { Room } from "../types";

type VideoProps = {
    room: Room | null;
};

export const Video = ({ room }: VideoProps) => {
    console.log("Video rendered:", new Date().toLocaleTimeString());

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [selBedOption, setSelBedOption] = useState<string | null>(
        room?.bedOptions?.[0]?.type || null     // Initialize based on the room prop
    );
    
    
    // Determine the current video source based on the selected bed option or default to the room video
    const currentVideo = useMemo(() => {
        if (selBedOption && room?.bedOptions) {
            return room.bedOptions.find(option => option.type === selBedOption)?.video || room.video;
        }

        return room?.bedOptions?.[0]?.video || room?.video;
    }, [room, selBedOption]);


    // Reload and play the video whenever the current video source changes
    useEffect(() => {
        console.log("Room selected: ", room?.name);
        
        if (videoRef.current && currentVideo) {
            videoRef.current.load();
            videoRef.current.play().catch((err) => console.error("Error playing video:", err));
        }
    }, [currentVideo, room]);
    
    
    const handleBedOptionClick = useCallback((type: string) => {
        if (type === selBedOption) return;  // Return early if the same bed option is selected
        setSelBedOption(type);
    }, [selBedOption]);


    return (
        <div className="flex items-center justify-center h-full w-full relative">
            {room ? (
                <>
                    <video
                        ref={videoRef}
                        className="h-full w-auto"
                        autoPlay
                        muted
                        loop
                    >
                        <source src={currentVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    <div className="absolute inset-0 flex flex-col-reverse items-start justify-between gap-4">
                        <DescriptionSection room={room} />
                        
                        {room.bedOptions && (
                            <BedOptionsSection
                                bedOptions={room.bedOptions}
                                selectedOption={selBedOption}
                                onOptionSelect={handleBedOptionClick}
                            />
                        )}
                    </div>
                </>
            ) : (
                <p className="text-xl text-brnd-light">
                    Select a room on the left to watch the video.
                </p>
            )}
        </div>
    );
}


// Description Section Component
const DescriptionSection = memo(({ room }: { room: Room }) => {
    console.log("Description rendered:", new Date().toLocaleTimeString());

    const [isDescVisible, setIsDescVisible] = useState(false);


    const toggleDescription = useCallback(() => {
        setIsDescVisible((prev) => !prev);
    }, []);


    return (
        <div className="w-full bg-gradient pb-6 pt-12">
            <div className="collapse room-details collapse-arrow rounded-none">
                <input 
                    type="checkbox"
                    className="peer"
                    onChange={toggleDescription}
                    checked={isDescVisible}
                />
                <div className="collapse-title font-medium text-sm capitalize">
                    {isDescVisible ? "hide details" : "show details"}
                </div>

                <div
                    className="collapse-content text-white bg-brnd-primary-100/95 rounded-md flex flex-col gap-2 mx-6 peer-checked:pt-4 peer-checked:mt-1 peer-checked:min-h-auto peer-checked:max-h-[17.5rem] overflow-y-auto"
                >
                    <p className="font-semibold text-lg">{room.name}</p>
                    <div className="flex flex-col gap-4 text-sm">
                        {room.description && (
                            <div className="h-fit">{room.description}</div>
                        )}

                        {room.roomFeatures && room.roomFeatures.length > 0 && (
                            <div>                                            
                                <p className="pb-2 font-medium tracking-wide">Room Features:</p>
                                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">   
                                    {room.roomFeatures.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <div className="h-[1.25rem] flex items-center">
                                                <Check size={12} />
                                            </div>
                                            <div>{feature}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});


// Bed Options Section Component
type BedOptionsProps = {
    bedOptions: { type: string; video: string }[];
    selectedOption: string | null;
    onOptionSelect: (type: string) => void;
}

const BedOptionsSection = memo(({ bedOptions, selectedOption, onOptionSelect }: BedOptionsProps) => {
    console.log("BedOptions rendered:", new Date().toLocaleTimeString());

    return (
        <div className="w-full bg-gradient bg-gradient-rotated flex gap-3 p-6">
            {bedOptions.map((option, index) => (
                <button
                    key={index}
                    className={`btn rounded-md shadow-none ${
                        selectedOption === option.type
                            ? "text-neutral bg-white"
                            : "text-white bg-white/20 border-transparent hover:bg-white/40 hover:border-white"
                    }`}
                    onClick={() => onOptionSelect(option.type)}
                >
                    {option.type}
                </button>
            ))}
        </div>
    );
});