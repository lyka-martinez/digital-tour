import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Check } from 'lucide-react';
import { Room } from "../types";

type VideoProps = {
    room: Room | null;
};

export const Video = ({ room }: VideoProps) => {
    console.log("Video rendered at", new Date().toLocaleTimeString());


    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isDescVisible, setIsDescVisible] = useState(false);
    const [selBedOption, setSelBedOption] = useState<string | null>(null);
    
    
    // Determine the current video source based on the selected bed option or default to the room video
    const currentVideo = useMemo(() => {
        if (selBedOption && room?.bedOptions) {
            return room.bedOptions.find(option => option.type === selBedOption)?.video || room.video;
        }

        return room?.bedOptions?.[0]?.video || room?.video;
    }, [room, selBedOption]);
    
    
    // Set the first bed option if none is selected
    useEffect(() => {
        if (!selBedOption && room?.bedOptions?.length) {
            setSelBedOption(room.bedOptions[0].type);
        }
    }, [room, selBedOption]);


    // Reload and play the video whenever the current video source changes
    useEffect(() => {
        console.log("Room selected", currentVideo);
        
        if (videoRef.current && currentVideo) {
            videoRef.current.load();
            videoRef.current.play().catch((err) => console.error("Error playing video:", err));
        }
    }, [currentVideo, room]);
    
    
    const handleBedOptionClick = useCallback((type: string) => {
        if (type === selBedOption) return;      // Return early if the same bed option is selectedl
        setSelBedOption(type);
    }, [selBedOption]);


    const toggleDescription = useCallback(() => {
        setIsDescVisible((prev) => !prev);
    }, []);


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
                        {/* Description Section */}
                        <div className="w-full bg-gradient p-6 pt-9">
                            <div className="collapse rounded-none">
                                <input 
                                    type="checkbox"
                                    className="peer video-desc"
                                    onChange={toggleDescription}
                                    checked={isDescVisible}
                                />
                                <div className="collapse-title font-medium video-desc text-sm">
                                    {isDescVisible ? "Hide details" : "Show details"}
                                </div>

                                <div
                                    className="collapse-content text-neutral bg-white/90 rounded-md flex flex-col gap-2 peer-checked:pt-4 peer-checked:mt-2 peer-checked:min-h-auto peer-checked:max-h-[17.5rem] overflow-y-auto"

                                    // className="collapse-content text-white bg-brnd-primary-100/90 rounded-md flex flex-col gap-2 peer-checked:pt-4 peer-checked:mt-2 peer-checked:min-h-auto peer-checked:max-h-[17.5rem] overflow-y-auto"
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
                                                        <li key={index} className="flex items-center gap-2">
                                                            <div><Check size={12} /></div>
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

                        {/* Bed Options Section */}
                        {room.bedOptions && (
                            <div className="w-full bg-gradient bg-gradient-rotated flex gap-3 p-6">
                                {room.bedOptions.map((option, index) => (
                                    <button 
                                        key={index} 
                                        className={`btn rounded-md shadow-none ${
                                            selBedOption === option.type
                                                ? "text-neutral bg-white"
                                                : "text-white bg-white/20 border-transparent hover:bg-white/40 hover:border-white"
                                        }`}
                                        onClick={() => handleBedOptionClick(option.type)}   
                                    >
                                        {option.type}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p className="text-xl text-brnd-light">Select a room to view its video content.</p>
            )}
        </div>
    );
}
